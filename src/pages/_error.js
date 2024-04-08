import Svg from "../../public/Assets/Svg";

function Error({ statusCode, res, err }) {
    return (
        <div className="flex items-center justify-center w-full h-full fixed top-0 left-0">
            <div className="text-center">
                {Svg().Error}
                <p className="mt-4">{statusCode
                    ? `An error ${statusCode} occurred on server`
                    : 'An error occurred on client'}
                </p>
                <p>
                    ERROR :  {err?.toString()}
                </p>
            </div>
        </div>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode, res, err }
}

export default Error