'use client'
export default function Error({error}){

    return <main className="error">
        <h1>AN Error occurred!</h1>
        <p>{error.message}</p>
    </main>
}
