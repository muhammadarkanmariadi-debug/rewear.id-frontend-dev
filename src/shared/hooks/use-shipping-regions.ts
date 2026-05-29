/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo } from "react";
import type { SingleValue } from "react-select";
import { binderbyteService } from "@/services/binderbyte.service";
import type { BinderbyteProvince, BinderbyteCity } from "@/entities/shipment";

export interface RegionOption {
  value: string;
  label: string;
}

export function useShippingRegions(initialProvinces: BinderbyteProvince[]) {
  const provinceOptions = useMemo<RegionOption[]>(
    () => initialProvinces.map((p) => ({ value: p.id, label: p.name })),
    [initialProvinces]
  );

  const [cityOptions, setCityOptions] = useState<RegionOption[]>([]);
  const [districtOptions, setDistrictOptions] = useState<RegionOption[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<SingleValue<RegionOption>>(null);
  const [selectedCity, setSelectedCity] = useState<SingleValue<RegionOption>>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<SingleValue<RegionOption>>(null);

  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  const handleProvinceChange = useCallback(async (option: SingleValue<RegionOption>) => {
    setSelectedProvince(option);
    setSelectedCity(null);
    setSelectedDistrict(null);
    setCityOptions([]);
    setDistrictOptions([]);

    if (option) {
      setLoadingCities(true);
      try {
        const cities = await binderbyteService.getCities(option.value);
        setCityOptions(cities.map((c: BinderbyteCity) => ({ value: c.id, label: c.name })));
      } catch (err) {
        console.error("Failed to load cities", err);
      } finally {
        setLoadingCities(false);
      }
    }
  }, []);

  const handleCityChange = useCallback(async (option: SingleValue<RegionOption>) => {
    setSelectedCity(option);
    setSelectedDistrict(null);
    setDistrictOptions([]);

    if (option) {
      setLoadingDistricts(true);
      try {
        const districts = await binderbyteService.getDistricts(option.value);
        setDistrictOptions(districts.map((d: any) => ({ value: d.id, label: d.name })));
      } catch (err) {
        console.error("Failed to load districts", err);
      } finally {
        setLoadingDistricts(false);
      }
    }
  }, []);

  return {
    provinceOptions,
    cityOptions,
    districtOptions,
    selectedProvince,
    selectedCity,
    selectedDistrict,
    loadingCities,
    loadingDistricts,
    handleProvinceChange,
    handleCityChange,
    setSelectedDistrict,
  };
}
