import "./UserIndexPage.less";
import React from "react";
import MainPageLayout from "./components/MainPageLayout";
import {RouteComponentProps} from "react-router";
import {ipcAsyncByMain} from "./utils/Ipc";
import {MainRoomMenu} from "./components/MainRoomMenu";
import {MainRoomList} from "./components/MainRoomList";
import {MainRoomHistory} from "./components/MainRoomHistory";

class UserIndexPage extends React.Component<React.PropsWithChildren<RouteComponentProps>> {
    public constructor(props: RouteComponentProps<{}>) {
        super(props);
    }

    public componentDidMount() {
        ipcAsyncByMain("set-win-size", {
            width: 1200,
            height: 668,
        });
    }

    public render(): React.ReactNode {
        return (
            <MainPageLayout>
                <MainRoomMenu/>
                <div className="main-room-layout">
                    <MainRoomList/>
                    <MainRoomHistory/>
                </div>
            </MainPageLayout>
        );
    }
}

export default UserIndexPage;
