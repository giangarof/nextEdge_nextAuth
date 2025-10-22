"use client"
const ErrorPage = ({error}) => {
    return ( <>
    <h1>Something went wrong</h1>
    {error.toString()}
    </> );
}
 
export default ErrorPage;