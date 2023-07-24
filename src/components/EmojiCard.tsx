import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

export interface Emoji {
  name: string;
  category: string;
  group: string;
  htmlCode: string[];
  unicode: string[];
}

interface EmojiProps {
  emoji: Emoji;
}

const EmojiCard: React.FC<EmojiProps> = ({ emoji }) => {
  const { name: emojiName, category, group, htmlCode, unicode } = emoji;
  const emojis = htmlCode.map((code, index) => (
    <span key={index} dangerouslySetInnerHTML={{ __html: code }} />
  ));
  return (
    <Card sx={{ maxWidth: "20rem", minHeight: "17rem", textAlign: "left" }}>
      <CardContent>
        <Box sx={{ fontSize: "2rem" }}>{emojis}</Box>
        <Typography>
          <b>Name :</b>
          {emojiName}
        </Typography>
        <Typography>
          <b>Category :</b> {category}
        </Typography>
        <Typography>
          <b>Group :</b> {group}
        </Typography>
        <Typography>
          <b>HTML Code : </b> {htmlCode}
        </Typography>
        <Typography>
          <b>Unicode :</b> {unicode}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { EmojiCard };
