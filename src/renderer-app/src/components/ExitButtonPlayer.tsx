import React from "react";
import { Button, Modal } from "antd";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { TopBarRightBtn } from "./TopBarRightBtn";
import { Identity } from "../utils/localStorage/room";

import replayScreen from "../assets/image/replay-screen.png";
import "./ExitButton.less";

export type ExitButtonPlayerStates = {
    exitViewDisable: boolean;
};

export type ExitButtonPlayerProps = {
    identity: Identity;
    uuid: string;
    userId: string;
} & RouteComponentProps<{}>;

class ExitButtonPlayer extends React.PureComponent<ExitButtonPlayerProps, ExitButtonPlayerStates> {
    public constructor(props: ExitButtonPlayerProps) {
        super(props);
        this.state = {
            exitViewDisable: false,
        };
    }

    private handleReplay = async (): Promise<void> => {
        const { identity, uuid, userId } = this.props;
        this.props.history.push(`/whiteboard/${identity}/${uuid}/${userId}/`);
    };

    private handleGoBack = async (): Promise<void> => {
        this.props.history.push("/");
    };

    private disableExitView = () => this.setState({ exitViewDisable: true });

    private enableExitView = () => this.setState({ exitViewDisable: false });

    public render(): React.ReactNode {
        return (
            <div>
                <TopBarRightBtn title="Exit" icon="wrong" onClick={this.disableExitView} />
                <Modal
                    visible={this.state.exitViewDisable}
                    footer={null}
                    title={"退出回放"}
                    onCancel={this.enableExitView}
                >
                    <div className="modal-box">
                        <div onClick={this.handleReplay}>
                            <img className="modal-box-img" src={replayScreen} />
                        </div>
                        <div className="modal-box-name">回到白板</div>
                        <Button onClick={this.handleGoBack} style={{ width: 176 }} size="large">
                            确认退出
                        </Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withRouter(ExitButtonPlayer);
