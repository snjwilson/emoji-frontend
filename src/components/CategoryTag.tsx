import { Box } from "@mui/material";
import { purple } from "@mui/material/colors";

interface CategoryProps {
  category: string;
  selectedCategory: string;
  setSelectedCategory: any;
}

export const CategoryTag: React.FC<CategoryProps> = ({
  category,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <Box
      sx={{
        display: "inline-block",
        border: `2px solid ${
          selectedCategory === category ? purple[500] : "white"
        }`,
        borderRadius: "1rem",
        padding: "0.5rem",
        margin: "0.25rem",
        cursor: "pointer",
      }}
      onClick={() => setSelectedCategory(category)}
    >
      {category}
    </Box>
  );
};
