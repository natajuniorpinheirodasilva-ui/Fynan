export async function POST(request: Request){
    const body = await request.json()
    const {email, password, repeatPassword} = body
    return Response.json({ email, password })
}