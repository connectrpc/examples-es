import { APIService } from '@buf/bufbuild_connect-web_mf192_bestofgo/api/api_service_connectweb.js'
import { useQueryHooks } from './query-provider'
import { IntervalFilter } from '@buf/bufbuild_connect-web_mf192_bestofgo/datapb/analytics_pb'
import { Suspense, useState } from 'react'
import {
    AppShell,
    Grid,
    Skeleton,
    SegmentedControl,
    Button,
    Header,
    Drawer,
    Stack,
    Card,
    Group,
    Text,
    Badge,
    Container,
    Table,
    Center,
    Loader,
} from '@mantine/core'
import { useIsFetching } from "@tanstack/react-query";

function App() {
    const { getTopRepositories } = useQueryHooks(APIService)
    const [intervalFilter, setIntervalFilter] = useState<IntervalFilter>(
        IntervalFilter.ALL
    )
    const isFetching = useIsFetching()
    
    const [selectedRepo, setSelectedRepo] = useState<null | string>(null)
    console.log({ intervalFilter })

    const topQueries = getTopRepositories.useQuery(
        {
            intervalFilter,
        },
        {
            // disable suspense for top level and let us handle it in the component
            suspense: false,
        }
    )

    return (
        <AppShell
            header={
                <Header height={60} p="xs">
                    
                    <Group position='apart'>
                    Best of Go
                    {isFetching && <Loader />}
                    </Group>
                </Header>
            }
        >
            <Stack justify="center">
                <Center>
                    <SegmentedControl
                        value={intervalFilter.toString()}
                        onChange={(value) => {
                            setIntervalFilter(
                                parseInt(value, 10) as IntervalFilter
                            )
                        }}
                        data={[
                            {
                                value: IntervalFilter.ALL.toString(),
                                label: 'All',
                            },
                            {
                                value: IntervalFilter.LAST_24_HOURS.toString(),
                                label: 'Last 24 hours',
                            },
                            {
                                value: IntervalFilter.LAST_7_DAYS.toString(),
                                label: 'Last 7 days',
                            },
                            {
                                value: IntervalFilter.LAST_30_DAYS.toString(),
                                label: 'Last 30 days',
                            }
                        ]}
                    />
                </Center>
            </Stack>
            <Stack spacing="xs">
                {topQueries.data === undefined ? (
                    <Skeleton animate />
                ) : (
                    topQueries.data.topRepos.map((repo) => (
                        <Center key={repo.repoFullName} >
                            <Card p="xs" shadow="md">
                                <Group position="center">
                                    <Text weight={500}>
                                        {repo.repoFullName}
                                    </Text>
                                    <Badge color="pink" variant="light">
                                        {repo.count}
                                    </Badge>
                                </Group>
                                <Group position="center">
                                    <Button
                                        onClick={() => {
                                            setSelectedRepo(repo.repoFullName)
                                        }}
                                    >
                                        Show details
                                    </Button>
                                </Group>
                            </Card>
                        </Center>
                    ))
                )}
            </Stack>
            <Drawer
                opened={selectedRepo !== null}
                onClose={() => setSelectedRepo(null)}
                position="right"
            >
                <Suspense fallback={<Skeleton animate />}>
                    {selectedRepo && (
                        <Details selectedRepoName={selectedRepo} />
                    )}
                </Suspense>
            </Drawer>
        </AppShell>
    )
}

const Details: React.FC<{ selectedRepoName: string }> = ({
    selectedRepoName,
}) => {
    const { getRepoSummary } = useQueryHooks(APIService)
    const repoDetails = getRepoSummary.useQuery({
        id: {
            id: {
                case: 'repoFullName',
                value: selectedRepoName,
            },
        },
    })

    if (repoDetails.data === undefined) {
        // suspense should cover this but we need to guard anyways
        return null
    }

    if (repoDetails.data.repo === undefined) {
        return <>No repo found</>
    }

    return (
        <Container p="sm" pt="0">
            <h2>{selectedRepoName}</h2>

            <Table
                style={{
                    width: '100%',
                }}
            >
                <tbody>
                    <tr>
                        <th>Description:</th>
                        <td>{repoDetails.data.repo.repoDescription}</td>
                    </tr>
                    <tr>
                        <th>Last Updated at:</th>
                        <td>
                            {repoDetails.data.repo.repoUpdatedAt !== undefined
                                ? Intl.DateTimeFormat().format(
                                      repoDetails.data.repo.repoUpdatedAt.toDate()
                                  )
                                : 'Never'}
                        </td>
                    </tr>
                    <tr>
                        <th>Open issues:</th>
                        <td>{repoDetails.data.repo.repoOpenIssuesCount}</td>
                    </tr>
                    <tr>
                        <th>Homepage:</th>
                        <td>
                            <a href={repoDetails.data.repo.repoHomepage}>
                                {repoDetails.data.repo.repoHomepage}
                            </a>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default App
