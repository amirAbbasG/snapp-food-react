import React from "react";
import { makeStyles } from "@mui/styles";
import { Dialog, DialogContent, Button, DialogTitle } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeCart } from "../../redux/action/orderActions";

const RemoveOrderDialog = ({ open, onClose, orderId }) => {
  const dispatch = useDispatch();
  const handleYes = () => {
    dispatch(removeCart(orderId));
    onClose();
  };

  const { dialog, content, button } = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{
        paper: dialog,
      }}
    >
      <DialogTitle>آیا از حذف سبد خرید مطمئن هستید ؟</DialogTitle>
      <DialogContent className={content}>
        <Button
          className={button}
          variant="contained"
          color="secondary"
          onClick={onClose}
        >
          انصراف
        </Button>
        <Button
          className={button}
          variant="contained"
          color="primary"
          onClick={handleYes}
        >
          حذف سبد
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveOrderDialog;

const useStyles = makeStyles((theme) => ({
  dialog: {
    borderRadius: 14,
    width: "30%",
    [theme.breakpoints.down("xl")]: {
      width: "50%",
    },
    [theme.breakpoints.down("md")]: {
      width: "70%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  button: {
    width: "44%",
    padding: 14,
    margin: 14,
    [theme.breakpoints.down("sm")]: {
      width: "55%",
      margin: 10,
    },
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
