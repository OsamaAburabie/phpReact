import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import "./Product.css";
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
function ProductList() {
  const [product, setproduct] = useState([]);
  const [cat, setCat] = React.useState(5);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setCat(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (search) {
      axios
        .get(`http://localhost/api/4_Search.php?name=${search}`)
        .then((res) => {
          setproduct(res.data);
        });
    } else {
      axios
        .get(`http://localhost/api/2_Category.php?cat_id=${cat}`)
        .then((res) => {
          setproduct(res.data);
        });
    }
  }, [cat, search]);

  const classes = useStyles();
  return (
    <div className="container">
      <div className="header">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={cat}
            onChange={handleChange}
          >
            <MenuItem value={5}>Watches</MenuItem>
            <MenuItem value={7}>Rings</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="standard-basic"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="product__container">
        {product &&
          product.map((pro) => (
            <ProductCard
              name={pro.name}
              desc={pro.description}
              img={pro.img_name}
            />
          ))}
      </div>
    </div>
  );
}

export default ProductList;
