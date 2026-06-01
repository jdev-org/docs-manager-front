import React from 'react';
import { Glyphicon } from "react-bootstrap";
import { isEmpty } from "lodash";
import Message from '@mapstore/components/I18N/Message';

/**
 * A simple component to display a message with title, text and icon
 * @param {object} props - Component props
 * @param {string} props.title - Static title text (if not using msgTitleId)
 * @param {string} props.msgTitleId - Message ID for the title (uses i18n)
 * @param {string} props.message - Static message text (if not using msgId)
 * @param {string} props.msgId - Message ID for the message (uses i18n)
 * @returns component
 */
export default function InformationArea(props) {
    let className = props.isVisible ? null : "collapse";
    let style = { textAlign: "center", margin: "25% auto", ...props.style };
    if (props?.style && !isEmpty(props.style)) {
        style = { ...style, ...props.style };
    }

    // Use msgTitleId if available, otherwise use title
    const titleContent = props.msgTitleId ? 
        <Message msgId={props.msgTitleId} /> : 
        props.title;
    
    // Use msgId if available, otherwise use message
    const messageContent = props.msgId ? 
        <Message msgId={props.msgId} /> : 
        props.message;

    return (
        <div className={className} style={style}>
            <Glyphicon glyph={props.glyph}
                style={{
                    margin: "0px",
                    fontSize: "36px"
                }}/>
            <h3 style={{ marginLeft: "0px", marginTop: "20px" }}>{titleContent}</h3>
            <h4 style={{ marginLeft: "0px", marginTop: "20px" }}>{messageContent}</h4>
            { props.content }
        </div>
    );
}