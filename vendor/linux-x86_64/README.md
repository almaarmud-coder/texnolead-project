# Vercel Linux runtime dependency

`libexpat.so.1` is built from the official Expat 2.10.0 source release. The
release archive SHA-256 is
`c624ba2998fc65df1163a49641ff3f9ab73138b11641d92c86bee0fb01b1bc7f`.

The library is x86-64 Linux and exports the stable `libexpat.so.1` SONAME
required by Rasterio's bundled GDAL. It was built with Expat's `arc4random`
probes disabled so its highest GLIBC symbol requirement is 2.25. The Expat
license is in `LICENSE.txt`.
