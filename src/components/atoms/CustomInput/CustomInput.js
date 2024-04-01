import {Input, Text} from "@chakra-ui/react";
import React from "react";
import './styles.scss'

export const CustomInput = (props) => {

    return (
        <div className="custom-input">
            <Text>{props.label}</Text>
            <Input {...props}/>
        </div>
    )
}
