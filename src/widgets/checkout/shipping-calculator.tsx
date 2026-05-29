/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Select, { type SingleValue, type StylesConfig, components, type OptionProps, type SingleValueProps } from "react-select";
import { Truck, MapPin } from "lucide-react";
import Image from "next/image";
import { binderbyteService } from "@/services/binderbyte.service";
import type { BinderbyteProvince, BinderbyteCity } from "@/entities/shipment";

// ── Hardcoded Courier Data ─────────────────────────────────

interface CourierOption {
  value: string;
  label: string;
  image: string;
}

const COURIER_OPTIONS: CourierOption[] = [
  { value: "jne", label: "JNE Express", image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Logo_JNE.png" },
  { value: "jnt", label: "J&T Express", image: "https://upload.wikimedia.org/wikipedia/commons/3/35/J%26T_Express_logo.svg" },
  { value: "sicepat", label: "SiCepat Ekspres", image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/SiCepat_logo.png" },
  { value: "anteraja", label: "AnterAja", image: "https://upload.wikimedia.org/wikipedia/commons/b/be/Anteraja_logo.png" },
  { value: "pos", label: "POS Indonesia", image: "https://upload.wikimedia.org/wikipedia/commons/9/95/Pos_Indonesia_logo.png" },
  { value: "tiki", label: "TIKI", image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Tiki_logo_2.png" },
  { value: "ninja", label: "Ninja Xpress", image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/NinjaVan_Logo.svg" },
  { value: "lion", label: "Lion Parcel", image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Logo_Lion_Parcel.png" },
  { value: "spx", label: "Shopee Express", image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopee_logo.svg" },
  { value: "wahana", label: "Wahana", image: "https://wahana.com/img/logo-wahana-sm.png" },
];

// ── Option Types ───────────────────────────────────────────

import { useShippingRegions, type RegionOption } from "@/shared/hooks/use-shipping-regions";

// ── Custom Courier Option Renderer ─────────────────────────

function CourierOptionComponent(props: OptionProps<CourierOption>) {
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-3">
        <div className="relative flex justify-center items-center bg-white border border-border/30 rounded w-8 h-8 overflow-hidden shrink-0">
          <Image src={props.data.image} alt={props.data.label} width={28} height={28} className="object-contain" unoptimized />
        </div>
        <span className="font-medium text-sm">{props.data.label}</span>
      </div>
    </components.Option>
  );
}

function CourierSingleValue(props: SingleValueProps<CourierOption>) {
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-3">
        <div className="relative flex justify-center items-center bg-white border border-border/30 rounded w-6 h-6 overflow-hidden shrink-0">
          <Image src={props.data.image} alt={props.data.label} width={22} height={22} className="object-contain" unoptimized />
        </div>
        <span className="font-medium text-sm">{props.data.label}</span>
      </div>
    </components.SingleValue>
  );
}

// ── Shared Styles for React Select ─────────────────────────

const selectStyles: StylesConfig<any, false> = {
  control: (base) => ({
    ...base,
    backgroundColor: "var(--color-surface-container, hsl(var(--surface-container)))",
    borderColor: "hsl(var(--border))",
    borderRadius: "0.75rem",
    padding: "0.25rem 0.25rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    boxShadow: "none",
    "&:hover": { borderColor: "hsl(var(--foreground) / 0.3)" },
    minHeight: "48px",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "hsl(var(--card))",
    borderRadius: "0.75rem",
    border: "1px solid hsl(var(--border))",
    overflow: "hidden",
    zIndex: 50,
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: "220px",
    padding: "4px",
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected
      ? "hsl(var(--foreground) / 0.08)"
      : isFocused
        ? "hsl(var(--foreground) / 0.04)"
        : "transparent",
    color: "hsl(var(--foreground))",
    borderRadius: "0.5rem",
    padding: "10px 12px",
    cursor: "pointer",
    "&:active": { backgroundColor: "hsl(var(--foreground) / 0.1)" },
  }),
  singleValue: (base) => ({
    ...base,
    color: "hsl(var(--foreground))",
  }),
  placeholder: (base) => ({
    ...base,
    color: "hsl(var(--muted-foreground))",
    fontSize: "0.875rem",
  }),
  input: (base) => ({
    ...base,
    color: "hsl(var(--foreground))",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "hsl(var(--muted-foreground))",
    "&:hover": { color: "hsl(var(--foreground))" },
  }),
};

// ── Props ──────────────────────────────────────────────────

interface ShippingCalculatorProps {
  initialProvinces: BinderbyteProvince[];
}

// ── Component ──────────────────────────────────────────────

export function ShippingCalculator({ initialProvinces }: ShippingCalculatorProps) {
  const {
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
  } = useShippingRegions(initialProvinces);

  const [selectedCourier, setSelectedCourier] = useState<SingleValue<CourierOption>>(null);

  return (
    <div className="flex flex-col gap-6">
      {/* Wilayah Tujuan */}
      <div className="bg-card shadow-sm p-6 border border-border rounded-2xl">
        <h3 className="flex items-center gap-2 mb-4 font-bold">
          <MapPin className="w-5 h-5" /> Tentukan Tujuan Pengiriman
        </h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1.5 font-semibold text-muted-foreground text-xs uppercase">Provinsi</label>
            <Select<RegionOption>
              options={provinceOptions}
              value={selectedProvince}
              onChange={handleProvinceChange}
              placeholder="-- Pilih Provinsi --"
              isClearable
              isSearchable
              styles={selectStyles}
              noOptionsMessage={() => "Tidak ditemukan"}
            />
          </div>
          <div>
            <label className="block mb-1.5 font-semibold text-muted-foreground text-xs uppercase">Kota / Kabupaten</label>
            <Select<RegionOption>
              options={cityOptions}
              value={selectedCity}
              onChange={handleCityChange}
              placeholder="-- Pilih Kota/Kabupaten --"
              isClearable
              isSearchable
              isLoading={loadingCities}
              isDisabled={!selectedProvince}
              styles={selectStyles}
              noOptionsMessage={() => "Pilih provinsi terlebih dahulu"}
            />
          </div>
          <div>
            <label className="block mb-1.5 font-semibold text-muted-foreground text-xs uppercase">Kecamatan</label>
            <Select<RegionOption>
              options={districtOptions}
              value={selectedDistrict}
              onChange={(option) => setSelectedDistrict(option)}
              placeholder="-- Pilih Kecamatan --"
              isClearable
              isSearchable
              isLoading={loadingDistricts}
              isDisabled={!selectedCity}
              styles={selectStyles}
              noOptionsMessage={() => "Pilih kota terlebih dahulu"}
            />
          </div>
        </div>
      </div>

      {/* Pilihan Kurir */}
      <div className="bg-card shadow-sm p-6 border border-border rounded-2xl">
        <h3 className="flex items-center gap-2 mb-4 font-bold">
          <Truck className="w-5 h-5" /> Pilih Kurir
        </h3>
        <Select<CourierOption>
          options={COURIER_OPTIONS}
          value={selectedCourier}
          onChange={(option) => setSelectedCourier(option)}
          placeholder="-- Pilih Kurir --"
          isClearable
          isSearchable
          styles={selectStyles}
          components={{ Option: CourierOptionComponent, SingleValue: CourierSingleValue }}
          noOptionsMessage={() => "Tidak ditemukan"}
        />
      </div>
    </div>
  );
}
