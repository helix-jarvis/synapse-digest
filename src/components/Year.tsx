'use client';

import { useState } from 'react';

export default function Year() {
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());

  return <>{year}</>;
}
