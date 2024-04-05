import {Input, InputGroup, InputLeftAddon, Text} from "@chakra-ui/react";
import React from "react";
import './styles.scss'
import colors from '../../constants/colors';

const CustomInput = (props) => {

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
                <Input variant="unstyled" {...props}/>
            </InputGroup>
        </div>
    )
}

export default CustomInput
