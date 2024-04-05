import {Text} from "@chakra-ui/react";
import React from "react";
import './styles.scss'
import colors from '../../constants/colors';

const CardInfo = (props) => {

    return (
        <div className="card-info">
            <div>
                <Text>{props?.name}</Text>
            </div>
            <div style={{background: colors.tertiary}}>
                <Text>{props?.value}</Text>
            </div>
        </div>
    )
}

export default CardInfo
