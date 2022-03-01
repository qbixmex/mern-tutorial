interface Auth {
    user: string | null,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string
}

export default Auth;