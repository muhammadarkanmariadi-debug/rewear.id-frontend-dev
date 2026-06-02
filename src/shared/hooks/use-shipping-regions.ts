/* eslint-disable @typescript-eslint/no-explicit-any */
import { City, Province } from "@/entities/shipment";
import { useState, useCallback, useMemo } from "react";
import type { SingleValue } from "react-select";


export interface RegionOption {
  value: string | number;
  label: string;
}

export function useShippingRegions(
  initialProvinces: Province[],
  initialCities: City[]
) {
  const provinceOptions = useMemo<RegionOption[]>(
    () => initialProvinces.map((p) => ({ value: p.id, label: p.name })),
    [initialProvinces]
  );

  const [cityOptions, setCityOptions] = useState<RegionOption[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<SingleValue<RegionOption>>(null);
  const [selectedCity, setSelectedCity] = useState<SingleValue<RegionOption>>(null);

  const handleProvinceChange = useCallback(
    (option: SingleValue<RegionOption>) => {
      setSelectedProvince(option);
      setSelectedCity(null);

      if (option) {
        const filtered = initialCities.filter(
          (c) => String(c.province_id) === String(option.value)
        );
        setCityOptions(filtered.map((c) => ({ value: c.id, label: c.name })));
      } else {
        setCityOptions([]);
      }
    },
    [initialCities]
  );

  const handleCityChange = useCallback((option: SingleValue<RegionOption>) => {
    setSelectedCity(option);
  }, []);

  return {
    provinceOptions,
    cityOptions,
    selectedProvince,
    selectedCity,
    handleProvinceChange,
    handleCityChange,
  };
}