import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import {
  Typography,
  Container,
  Grid,
  Pagination,
  Box,
  CircularProgress,
} from "@mui/material";
import { EmojiCard, Emoji } from "./components/EmojiCard";
import { CategoryTag } from "./components/CategoryTag";

function App() {
  const pageSize: number = 10;
  const [emojis, setEmojis] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchEmojis = async () => {
    setLoading(true);
    let { data: emojiData } = await axios.get(
      "https://emojihub.yurace.pro/api/all"
    );
    if (categories.length === 0) {
      const newCategorySet = new Set();
      emojiData.map((emoji: Emoji) => newCategorySet.add(emoji.category));
      const finalCategories: unknown[] = Array.from(newCategorySet);
      setCategories(finalCategories);
      setPageCount(parseInt(emojiData.length / 10));
    }
    if (selectedCategory) {
      emojiData = emojiData.filter(
        (emoji: Emoji) => emoji.category === selectedCategory
      );
    }
    setEmojis(emojiData.slice((page - 1) * pageSize, page * pageSize));
    setLoading(false);
  };

  const handlePageChange = (
    event: ChangeEvent<unknown> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchEmojis();
  }, [page, selectedCategory]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box sx={{ marginBottom: "1rem" }}>
        {categories.map((category, key) => (
          <CategoryTag
            key={key + "category-tag"}
            category={category}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
      </Box>
      <Container>
        {emojis.length === 0 && (
          <Typography variant="h3">No emoji's to Display</Typography>
        )}
        <Grid container spacing={2}>
          {emojis.map((emoji, key) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
              <EmojiCard emoji={emoji} />
            </Grid>
          ))}
        </Grid>
        <Box>
          <Pagination
            page={page}
            count={pageCount}
            color="primary"
            sx={{ bgcolor: "white", marginTop: "1rem", padding: "0.5rem" }}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </Box>
      </Container>
    </>
  );
}

export default App;
