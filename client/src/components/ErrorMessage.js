export const ErrorMessages = ({error}) => {
    return (
        <div className="errorWrapper">
            <span>{error.message}</span>
        </div>
    )
}