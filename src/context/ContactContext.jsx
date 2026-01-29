import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { contactsApi } from "../api/contactsApi";

const ContactContext = createContext(null);

const initialState = {
  contacts: [],
  loading: false,
  error: "",
  query: "",
  filter: "NONE" // FIRST_AZ | LAST_AZ | OLDEST_FIRST
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "ADD_CONTACT":
      return { ...state, contacts: [action.payload, ...state.contacts] };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((c) => (c.id === action.payload.id ? action.payload : c))
      };
    case "DELETE_CONTACT":
      return { ...state, contacts: state.contacts.filter((c) => c.id !== action.payload) };
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

function normalize(s) {
  return (s ?? "").toString().trim().toLowerCase();
}

function applySearchAndFilter(contacts, query, filter) {
  const q = normalize(query);

  let list = contacts;

  if (q) {
    list = list.filter((c) => {
      const hay = [
        c.firstName, c.lastName, c.email, c.phone, c.address, c.company
      ].map(normalize).join(" ");
      return hay.includes(q);
    });
  }

  const sorted = [...list];
  if (filter === "FIRST_AZ") {
    sorted.sort((a, b) => normalize(a.firstName).localeCompare(normalize(b.firstName)));
  } else if (filter === "LAST_AZ") {
    sorted.sort((a, b) => normalize(a.lastName).localeCompare(normalize(b.lastName)));
  } else if (filter === "OLDEST_FIRST") {
    // createdAt থাকলে সেটি, না থাকলে id ধরে
    sorted.sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : a.id;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : b.id;
      return da - db;
    });
  }
  return sorted;
}

export function ContactProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchContacts() {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: "" });
    try {
      const res = await contactsApi.list();
      // newest first by default
      const sorted = [...res.data].sort((a, b) => {
        const da = a.createdAt ? new Date(a.createdAt).getTime() : a.id;
        const db = b.createdAt ? new Date(b.createdAt).getTime() : b.id;
        return db - da;
      });
      dispatch({ type: "SET_CONTACTS", payload: sorted });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e?.message || "Failed to load contacts" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function addContact(payload) {
    dispatch({ type: "SET_ERROR", payload: "" });
    const withMeta = { ...payload, createdAt: new Date().toISOString() };
    const res = await contactsApi.create(withMeta);
    dispatch({ type: "ADD_CONTACT", payload: res.data });
    return res.data;
  }

  async function updateContact(id, payload) {
    dispatch({ type: "SET_ERROR", payload: "" });
    const res = await contactsApi.update(id, payload);
    dispatch({ type: "UPDATE_CONTACT", payload: res.data });
    return res.data;
  }

  async function deleteContact(id) {
    dispatch({ type: "SET_ERROR", payload: "" });
    await contactsApi.remove(id);
    dispatch({ type: "DELETE_CONTACT", payload: id });
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  const visibleContacts = useMemo(() => {
    return applySearchAndFilter(state.contacts, state.query, state.filter);
  }, [state.contacts, state.query, state.filter]);

  const value = {
    state,
    dispatch,
    actions: {
      fetchContacts,
      addContact,
      updateContact,
      deleteContact
    },
    visibleContacts
  };

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
}

export function useContacts() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContacts must be used within ContactProvider");
  return ctx;
}
