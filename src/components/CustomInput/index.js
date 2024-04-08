import {IconButton, Input, InputGroup, InputLeftAddon, InputRightElement, Text} from "@chakra-ui/react";
import React, {useState} from "react";
import './styles.scss'
import colors from '../../constants/colors';
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

const CustomInput = (props) => {
    const [hide, setHide] = useState(false)

    return (
        <div className="custom-input">
            <Text>{props?.label}</Text>
            <InputGroup>
                {props?.prefix &&
                    <InputLeftAddon
                        style={{background: colors.tertiary}}
                    >
                        {props?.prefix}
                    </InputLeftAddon>
                }
                <Input
                    type={hide ? "password" : (props?.type || "text")}
                    variant="unstyled"
                    {...props}
                />
                {props?.senha &&
                    <InputRightElement>
                        <IconButton
                            icon={hide ? <ViewOffIcon/> : <ViewIcon/>}
                            variant="ghost"
                            onClick={() => setHide(!hide)}
                        />
                    </InputRightElement>
                }
            </InputGroup>
        </div>
    )
}

export default CustomInput
