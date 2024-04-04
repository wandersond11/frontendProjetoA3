import {Text} from "@chakra-ui/react";
import React, {useState} from "react";
import './styles.scss'
import colors from "../../../constants/colors";
import {ChevronDownIcon, ChevronUpIcon} from "@chakra-ui/icons";

export const CustomSelect = (props) => {
    const [open, setOpen] = useState(false)

    return (
        <>
        <div className="custom-select">
            <Text>{props?.label}</Text>
            <div onClick={() => setOpen(true)}>
                <Text>{props?.value}</Text>
                {open ? <ChevronUpIcon/> : <ChevronDownIcon/>}
            </div>
            {open &&
                <aside
                    onClick={() => setOpen(false)}
                    style={{background: colors.secondary}}
                >
                    {props?.options.map((value) => {
                        return <div onClick={() => props?.onChange(value)}>{value}</div>
                    })}
                </aside>
            }
        </div>
        {open && <div onClick={() => setOpen(false)} className="scanner"/>}
        </>
    )
}
