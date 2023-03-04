export default async function Page() {
    const res = await fetch(`http://localhost:3000/api/eliza`)
    const js = await res.json()

    return (
        <div>
            <span>{js.sentence}</span>
        </div>
    )
}
