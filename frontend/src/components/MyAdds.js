import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import DeleteAdd from "./elements/DeleteAdd";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Card } from "@mui/material";
import IconSwitcher from "./IconSwitcher";
import moment from "moment";
import { CardContent, Divider } from "@mui/material";
import LikedAdd from "./LikedAdd";

let humanize = require("humanize-number");

const MyAdds = () => {
  const userId = useSelector((store) => store.user.userId);
  const [myAdds, setMyAdds] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const options = {
      method: "GET",
    };
    fetch(API_URL(`userprofile/${id}`), options)
      .then((res) => res.json())
      .then((data) => {
        setMyAdds(data.response.add);
      });
  }, [id, myAdds._id]);

  return (
    <>
      <Divider variant="middle">
        <Typography sx={{ fontFamily: "secondary.fontFamily", fontSize: 20 }}>
          Created adds
        </Typography>
      </Divider>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 3,
          paddingTop: 2.5,
          paddingBottom: 4,
        }}
      >
        {myAdds.map((add) => (
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: 300,
              height: 350,
              padding: 2,
              marginBottom: 2,
              fontFamily: "secondary.fontFamily",
            }}
            key={add._id}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography
                  sx={{ padding: 0, fontFamily: "secondary.fontFamily" }}
                >
                  {add.typeOf} {add.category}
                </Typography>
                <Typography
                  sx={{
                    padding: 0,
                    fontFamily: "secondary.fontFamily",
                    fontSize: 14,
                    fontStyle: "italic",
                  }}
                >
                  {moment(add.createdAt).fromNow()}
                </Typography>
              </Box>
              <img
                src={IconSwitcher(add.category)}
                style={{ width: 38, height: 38 }}
                alt="icon"
              />
            </Box>

            <CardContent sx={{ overflowY: "auto", paddingLeft: 0 }}>
              <Typography
                sx={{
                  fontFamily: "primary.fontFamily",
                  padding: 0,
                  fontWeight: 600,
                  marginBottom: 1,
                }}
              >
                {add.title}
              </Typography>
              <Typography
                sx={{
                  wordBreak: "break-word",
                  fontFamily: "secondary.fontFamily",
                  padding: 0,
                  marginBottom: 2,
                }}
              >
                {add.description}
              </Typography>

              <Typography
                sx={{
                  fontFamily: "secondary.fontFamily",
                  padding: 0,
                }}
              >
                Budget: {humanize(add.budget)} {add.currency}
              </Typography>
            </CardContent>
            {id === userId && <DeleteAdd myAddsId={add._id} />}
            {id !== userId && <LikedAdd addId={add._id} />}
          </Card>
        ))}
      </Box>
    </>
  );
};

export default MyAdds;
