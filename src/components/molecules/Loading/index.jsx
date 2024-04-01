import {CircularProgress} from '@chakra-ui/react'
import {LoadingContext} from "../../../context/Loading";

export const Loading = ({children}) => (
    <LoadingContext.Consumer>
        {(context) => {
            const {loading} = context;
            return (
                <>
                    {children}
                    {loading && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "fixed",
                                width: "100vw",
                                height: "100vh",
                                background: "#FFFFFF80",
                                zIndex: "9999",
                                top: '0',
                                left: '0'
                            }}
                        >
                            <CircularProgress isIndeterminate color="brand.400"/>
                        </div>
                    )}
                </>
            );
        }}
    </LoadingContext.Consumer>
)




