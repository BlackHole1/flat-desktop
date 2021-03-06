import React from "react";
import send from "../../assets/image/send.svg";
import banChat from "../../assets/image/ban-chat.svg";
import banChatActive from "../../assets/image/ban-chat-active.svg";
import { Identity } from "../../utils/localStorage/room";

export interface ChatTypeBoxProps {
    /** Only room owner can ban chatting. */
    identity: Identity;
    isBan: boolean;
    onBanChange: (isBan: boolean) => void;
    onSend: (text: string) => Promise<void>;
}

export interface ChatTypeBoxState {
    text: string;
    isSending: boolean;
}

export class ChatTypeBox extends React.PureComponent<ChatTypeBoxProps, ChatTypeBoxState> {
    state: ChatTypeBoxState = {
        text: "",
        isSending: false,
    };

    updateText = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ text: e.currentTarget.value.slice(0, 200) });
    };

    send = async (): Promise<void> => {
        const text = this.state.text.trim();
        if (!text) {
            return;
        }
        this.setState({ isSending: true });
        await this.props.onSend(text);
        this.setState({ text: "", isSending: false });
    };

    toggleBan = (): void => {
        this.props.onBanChange(!this.props.isBan);
    };

    onInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            this.send();
        }
    };

    render(): React.ReactNode {
        const { identity, isBan } = this.props;
        const { text, isSending } = this.state;

        return (
            <div className="chat-typebox">
                {identity === Identity.creator && (
                    <button className="chat-typebox-ban" title="禁言" onClick={this.toggleBan}>
                        <img src={isBan ? banChatActive : banChat} />
                    </button>
                )}
                {isBan ? (
                    <span className="chat-typebox-ban-input" title="全员禁言中">
                        全员禁言中
                    </span>
                ) : (
                    <input
                        className="chat-typebox-input"
                        type="text"
                        placeholder="说点什么…"
                        value={text}
                        onChange={this.updateText}
                        onKeyPress={this.onInputKeyPress}
                    />
                )}
                <button
                    className="chat-typebox-send"
                    title="发送"
                    onClick={this.send}
                    disabled={isBan || isSending || text.length <= 0}
                >
                    <img src={send} />
                </button>
            </div>
        );
    }
}

export default ChatTypeBox;
