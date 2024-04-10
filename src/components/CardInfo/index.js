import {Text} from "@chakra-ui/react";
import React from "react";
import './styles.scss'
import colors from '../../constants/colors';

const CardInfo = (props) => {

    return (
        props?.value &&
        <div className="card-info">
            <div>
                <Text>{props?.name}</Text>
            </div>
            <div style={{background: colors.main}}>
                <Text>
                    {(props?.prefix || "") + props?.value + (props?.suffix || "")}
                </Text>
            </div>
        </div>
    )
}

export default CardInfo
