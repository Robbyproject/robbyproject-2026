"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Ambil satu baris dari tabel Supabase berdasarkan id.
 * Dipakai ulang oleh semua halaman detail (store, waifu, anime, projects, achievements).
 *
 * @param table nama tabel Supabase (mis. "products")
 * @param id    id baris (dari params route)
 */
export function useDetailItem(table: string, id: string | string[] | undefined) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let isMounted = true;

        // Tidak ada id -> langsung selesai (tidak loading selamanya)
        if (id === undefined || id === null || id === "") {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const { data: row, error: err } = await supabase
                    .from(table)
                    .select("*")
                    .eq("id", id)
                    .maybeSingle();

                if (!isMounted) return;
                if (err) throw err;
                setData(row);
            } catch (e) {
                console.error(`Error fetching ${table}/${id}:`, e);
                if (isMounted) setError(true);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();
        return () => { isMounted = false; };
    }, [table, id]);

    return { data, loading, error };
}
