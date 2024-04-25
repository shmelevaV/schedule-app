import React, { useContext } from "react";
import {Col, Container, Row} from "react-bootstrap";
import GeneralTable from "../components/GeneralTable";
import SideBar from "../components/SideBar";
import TableByDays from "../components/TableByDays";
import TableByAuds from "../components/TableByAuds";
import { Context } from "../index"; 
import { observer } from "mobx-react-lite";

const Schedule = observer(() => {
    const { view } = useContext(Context);

    let scheduleTable;
    switch(view.scheduleView) {
        case "общий":
            scheduleTable = <GeneralTable/>;
            break;
        case "по дням":
            scheduleTable = <TableByDays/>;
            break;
        case "по аудиториям":
            scheduleTable = <TableByAuds/>;
            break;
        default:
            scheduleTable = <GeneralTable/>;
    }

    return (
        <Container>
            <Row className="mt-3">
                <Col md={3}>
                    <SideBar/>
                </Col>
                <Col md={9}>
                    <h1 style={{textAlign: "center"}}>1-203a</h1>
                    {scheduleTable}
                </Col>
            </Row>
        </Container>
    );
});

export default Schedule;
