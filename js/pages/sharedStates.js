import React, { useState } from 'react';
import { useBetween } from 'use-between';


function sharedStates() {
  const [fragen, setFragen] = useState([]);
  const [aktuelleFrage, setAktuelleFrage] = useState(0);
  const [points, setPoints] = useState(0)
  return {
    fragen,
    setFragen,
    aktuelleFrage,
    setAktuelleFrage,
    points,
    setPoints
  }
}

export const useSharedStates = () => useBetween(sharedStates);