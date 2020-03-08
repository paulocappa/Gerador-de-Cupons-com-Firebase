import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  Button,
  TextField,
  FormControl,
  Select,
  Input,
  InputLabel
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Form, ButtonFiltrar, DivList, List } from "./styles";
import Container from "../../components/Container";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function Main() {
  const [malls, setMalls] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedMall, setSelectedMall] = useState("default");
  const [selectedStores, setSelectedStores] = useState("default");
  const [selectedStatus, setSelectedStatus] = useState("default");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [infoDialog, setInfoDialog] = useState({});

  const classes = useStyles();
  const [selectedCouponNameDialog, setSelectedCouponNameDialog] = useState("");
  const [selectedStatusDialog, setSelectedStatusDialog] = useState("");
  const [selectedStartDateDialog, setSelectedStartDateDialog] = useState("");
  const [selectedEndDateDialog, setSelectedEndDateDialog] = useState("");

  useEffect(() => {
    async function getMalls() {
      const { data } = await api.get("/getMalls");

      await setMalls(data);
    }

    getMalls();
  }, []);

  async function onSelectMallChange(e) {
    setSelectedMall(e.target.value);

    if (e.target.value !== "default") {
      const { store } = malls.find(item => item.mall === e.target.value);

      await setStores(store);
    } else {
      setSelectedStores("default");
    }
  }

  async function onSelectStoreChange(e) {
    await setSelectedStores(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await setCoupons([]);

    const { data } = await api.get("/showCoupons", {
      headers: {
        mall: selectedMall,
        store: selectedStores,
        status: selectedStatus
      }
    });

    await setCoupons(data);
    setLoading(false);
  }

  async function onDeleteCoupon(coupon) {
    await onDeleteDialog(false, {});

    await api.delete("/deleteCoupon", {
      headers: {
        mall: coupon.moreDetails.mall,
        store: coupon.moreDetails.store,
        coupon: coupon.key
      }
    });

    const { data } = await api.get("/showCoupons", {
      headers: {
        mall: coupon.moreDetails.mall,
        store: coupon.moreDetails.store,
        status: coupon.couponDetails.status
      }
    });

    await setCoupons(data);
  }

  function onDeleteDialog(state, coupon) {
    setInfoDialog(coupon);
    setDeleteDialog(state);
  }

  function onUpdateDialog(state, coupon) {
    setInfoDialog(coupon);
    setUpdateDialog(state);
  }

  async function onUpdateCoupon() {
    onUpdateDialog(false, {});
    if (
      (selectedStartDateDialog !== "" && selectedEndDateDialog === "") ||
      (selectedEndDateDialog !== "" && selectedStartDateDialog === "")
    ) {
      return;
    }

    const updates = {};

    if (selectedCouponNameDialog !== "") {
      updates.newCouponName = selectedCouponNameDialog;
    }

    if (selectedStatusDialog !== "") {
      updates.newStatus = selectedStatusDialog;
    }

    if (selectedStartDateDialog !== "") {
      updates.newStartDate = selectedStartDateDialog;
      updates.newEndDate = selectedEndDateDialog;
    }

    if (infoDialog !== undefined) {
      await api.put("/updateCoupon", updates, {
        headers: {
          mall: infoDialog.moreDetails.mall,
          store: infoDialog.moreDetails.store,
          coupon: infoDialog.key
        }
      });
      await setCoupons([]);
    }
  }

  return (
    <>
      <Container>
        <header>
          <strong>Filtrar Cupons</strong>
        </header>

        <Form>
          <div>
            <span>Shopping</span>
            <select value={selectedMall} onChange={onSelectMallChange}>
              <option value="default">--Selecione--</option>
              {malls.map((item, index) => (
                <option key={index} value={item.mall}>
                  {item.mall}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span>Loja</span>
            <select value={selectedStores} onChange={onSelectStoreChange}>
              <option value="default">--Selecione--</option>
              {selectedMall !== "default" &&
                stores.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <span>Status</span>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
            >
              <option value="default">--Selecione--</option>
              {selectedMall !== "default" && (
                <>
                  <option value="Ativa">Ativa</option>
                  <option value="Encerrada">Encerrada</option>
                </>
              )}
            </select>
          </div>
        </Form>

        <ButtonFiltrar loading={loading}>
          <button onClick={onSubmit}>Filtrar</button>
        </ButtonFiltrar>
      </Container>

      <Container>
        <header>
          <strong>Listagem de Cupons</strong>
          <Link to={"/cadastro"}>Cadastrar Cupom</Link>
        </header>

        <DivList>
          <List>
            <li>Shopping</li>
            <li>Loja</li>
            <li>Título</li>
            <li>Tipo</li>
            <li>Status</li>
            <li>Opções</li>
          </List>

          {coupons.map(coupon => (
            <List key={coupon.key}>
              <li>{coupon.moreDetails.mall}</li>
              <li>{coupon.moreDetails.store}</li>
              <li>{coupon.key}</li>
              <li>{coupon.couponDetails["Tipo do Cupom"]}</li>
              <li>{coupon.couponDetails.status}</li>
              <li>
                <Link to="" onClick={() => onUpdateDialog(true, coupon)}>
                  <MdEdit />
                </Link>
                <Link to="" onClick={() => onDeleteDialog(true, coupon)}>
                  <MdDeleteForever />
                </Link>
              </li>
            </List>
          ))}
        </DivList>
      </Container>

      <Dialog
        fullWidth
        open={updateDialog}
        onClose={() => onUpdateDialog(false, {})}
      >
        <DialogTitle>Atualizar dados do cupom</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Defina os valores nos campos que deseja alterar
          </DialogContentText>
          <form className={classes.container}>
            {/* <FormControl fullWidth className={classes.formControl}>
              <TextField
                margin="dense"
                label="Novo título do cupom"
                type="text"
                fullWidth
                value={selectedCouponNameDialog}
                onChange={e => setSelectedCouponNameDialog(e.target.value)}
              />
            </FormControl> */}

            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="label-store">Status</InputLabel>
              <Select
                native
                value={selectedStatusDialog}
                onChange={e => setSelectedStatusDialog(e.target.value)}
                input={<Input id="label-store" />}
              >
                <option value=""></option>
                <option value="Ativa">Ativa</option>
                <option value="Encerrada">Encerrada</option>
              </Select>
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
              <TextField
                id="date"
                label="Data de Início"
                type="date"
                value={selectedStartDateDialog}
                onChange={e => setSelectedStartDateDialog(e.target.value)}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
              <TextField
                id="date"
                label="Data de Término"
                type="date"
                value={selectedEndDateDialog}
                onChange={e => setSelectedEndDateDialog(e.target.value)}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="default" onClick={() => onUpdateDialog(false, {})}>
            Cancelar
          </Button>
          <Button color="primary" onClick={onUpdateCoupon}>
            Atualizar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        open={deleteDialog}
        onClose={() => onDeleteDialog(false, {})}
      >
        <DialogTitle>Deseja excluir?</DialogTitle>
        <DialogContent>
          {deleteDialog && (
            <DialogContentText>
              <strong>Cupom:</strong> {infoDialog.key} <br />
              <strong>Loja:</strong> {infoDialog.moreDetails.store} <br />
              <strong>Shopping:</strong> {infoDialog.moreDetails.mall}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="default" onClick={() => onDeleteDialog(false, {})}>
            Cancelar
          </Button>
          <Button color="secondary" onClick={() => onDeleteCoupon(infoDialog)}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
