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
import {
    useIsFetching,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'

function App() {
    const { getTopRepositories } = useQueryHooks(APIService)
    const [intervalFilter, setIntervalFilter] = useState<IntervalFilter>(
        IntervalFilter.ALL
    )
    const isFetching = useIsFetching()

    const [selectedRepo, setSelectedRepo] = useState<null | string>(null)

    const topQueries = useQuery({
        ...getTopRepositories.useQueryOptions({
            intervalFilter,
        }),
        suspense: false,
    })

    return (
        <AppShell
            header={
                <Header height={60} p="xs">
                    <Group position="apart">
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
                            },
                        ]}
                    />
                </Center>
            </Stack>
            <Stack spacing="xs">
                {topQueries.data === undefined ? (
                    <Skeleton animate />
                ) : (
                    topQueries.data.topRepos.map((repo) => (
                        <Center key={repo.repoFullName}>
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
    const { getRepoSummary, getTopRepositories } = useQueryHooks(APIService)
    const queryClient = useQueryClient()
    const repoDetails = useQuery(
        getRepoSummary.useQueryOptions({
            id: {
                id: {
                    case: 'repoFullName',
                    value: selectedRepoName,
                },
            },
        })
    )
    // not a real mutation, just a way to show mutating local state.
    const addStar = useMutation({
        ...getRepoSummary.useMutationOptions(),
        onSuccess: () => {
            // This is where linking between queries would be useful
            queryClient.setQueryData(...getRepoSummary.createQueryUpdater({
                id: {
                    id: {
                        case: 'repoFullName',
                        value: selectedRepoName,
                    },
                }
            }, (prev) => {
                if (!prev || !prev.repo) {
                    return prev;
                }
                return {
                    ...prev,
                    repo: {
                        ...prev.repo,
                        repoStargazersCount: (prev.repo?.repoStargazersCount ?? 0) + 1,
                    }
                } as any
            }))
            queryClient.setQueriesData(...getTopRepositories.createQueriesUpdater((old) => {
                const oldRepo = old?.topRepos.find((r) => r.repoFullName === selectedRepoName);
                if (!oldRepo || !old?.topRepos) {
                    return old;
                }
                return {
                    ...old,
                    topRepos: old.topRepos.map((r) => {
                        if (r.repoFullName === selectedRepoName) {
                            return {
                                ...r,
                                count: r.count + 1,
                            }
                        }
                        return r;
                    })
                    // I think there is a better type safe way to do this
                } as any
            }))

        }
    });

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
                    <tr>
                        <th>Stars:</th>
                        <td>
                            {repoDetails.data.repo?.repoStargazersCount ?? 0}
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Button onClick={() => addStar.mutate({
                id: {
                    id: {
                        case: 'repoFullName',
                        value: selectedRepoName,
                    }
                }
            })}>Add a star</Button>
        </Container>
    )
}

export default App
