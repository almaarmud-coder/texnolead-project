const HORIZONS_PROXY = "/api/horizons";
const SOLAR_CONSTANT = 1361;
const DAY_MS = 86_400_000;
const MOON_RADIUS_KM = 1737.4;
const TILE_RESOLUTION_0 = 3.0578404017857101e7 * 0.00028;
const TILE_ORIGIN = 1_095_930;
const NASA_LOLA_TILES = "https://trek.nasa.gov/tiles/Moon/SP/LRO_LOLA_ClrShade_SPole75_30mp_v04/1.0.0/default/default028mm/{z}/{y}/{x}.png";
const NASA_PSR_OVERLAY = "/assets/lola_psr_75s_120m.png";
const SUN_ANGULAR_RADIUS_DEG = 0.266;
const EARTH_ANGULAR_RADIUS_DEG = 0.95;

const sites = {
  team: { id: "team", nameAz: "Mons Mouton · komanda nöqtəsi", nameEn: "Mons Mouton · team point", shortAz: "Mons Mouton · komanda nöqtəsi", shortEn: "Mons Mouton · team point", lat: -84.81, lon: 38.81, altKm: 0, source: "TEAM POINT" },
  landingA: { id: "landingA", nameAz: "Mons Mouton · Eniş Zonası A", nameEn: "Mons Mouton · Landing Zone A", shortAz: "Mons Mouton · Eniş Zonası A", shortEn: "Mons Mouton · Landing Zone A", lat: -84.81, lon: 38.15, altKm: 6, source: "TEAM REF · 6 KM" },
  center: { id: "center", nameAz: "Mons Mouton · USGS mərkəzi", nameEn: "Mons Mouton · USGS center", shortAz: "Mons Mouton · USGS mərkəzi", shortEn: "Mons Mouton · USGS center", lat: -84.60, lon: 31.00, source: "USGS" },
  shackleton: { id: "shackleton", nameAz: "Shackleton · USGS mərkəzi", nameEn: "Shackleton · USGS center", shortAz: "Shackleton · USGS mərkəzi", shortEn: "Shackleton · USGS center", lat: -89.67, lon: 129.78, source: "USGS" },
  custom: { id: "custom", nameAz: "Xüsusi xəritə nöqtəsi", nameEn: "Custom map point", shortAz: "Xüsusi koordinat", shortEn: "Custom coordinate", lat: -84.81, lon: 38.81, altKm: 0, source: "MAP POINT" },
};

const strings = {
  az: {
    eyebrow: "AYIN CƏNUB QÜTBÜ · MİSSİYA PLANLAMASI", headline: "Eniş nöqtəsini seç.<br /><span>Səmanı əvvəlcədən gör.</span>", intro: "NASA xəritə qatları və JPL Horizons hesablamaları ilə Günəş enerjisini, Yer görünüşünü və mümkün missiya pəncərələrini araşdırın.", brief: "Real koordinat · saatlıq ephemeris · mənbəsi görünən nəticə", missionTab: "Missiya paneli", compareTab: "Sahələri müqayisə et", sourcesTab: "Məlumat və metod", terrainHeading: "NASA LOLA · CƏNUB QÜTBÜ TOPOQRAFİYASI", resetMap: "Nöqtəyə qayıt", psrOn: "PSR qatı: açıq", psrOff: "PSR qatı: bağlı", mapLoading: "NASA Moon Trek xəritəsi yüklənir…", selectedPoint: "SEÇİLMİŞ NÖQTƏ", landingPoint: "Eniş nöqtəsi", lolaRelief: "LOLA rəngli relyef", permanentShadow: "Daimi kölgə · PSR", mapHelp: "Xəritədə klikləyərək koordinat seçin. Fon NASA Moon Trek LOLA kölgəli relyefidir; mavi qat NASA-nın 120 m daimi kölgə (PSR) rasteridir.", missionControls: "MİSSİYA PARAMETRLƏRİ", planWindow: "Pəncərəni hesabla", siteLabel: "ENİŞ İSTİNADI", eastLongitude: "Şərq uzunluğu", startDate: "BAŞLANĞIC TARİXİ", duration: "MÜDDƏT", days: "gün", panelModel: "GÜNƏŞ PANELİ · MODEL", idealPlane: "üfüqi · LOLA üfüqü", calculate: "Pəncərəni hesabla", searchSpanLabel: "ƏN UYĞUN TARİXİ AXTAR", findBestWindow: "Ən yaxşı missiya pəncərəsini tap", windowScoreNote: "Sıralama: ideal enerji və Yer görünüşü, hər biri 50%. İlkin seçimdir, təhlükəsizlik zəmanəti deyil.", liveNote: "Hesablama: NASA/JPL Horizons · 1 saat addımı", sunMetricTitle: "GÜNƏŞLİ MÜDDƏT", earthMetricTitle: "YER GÖRÜNÜŞÜ", energyMetricTitle: "PANEL ENERJİSİ", metricEmpty: "JPL Horizons cavabı gözlənilir.", energyEmpty: "Hesablamaq üçün sahə və səmərəliliyi daxil edin.", chartKicker: "ÜFÜQƏ NƏZƏRƏN GÖRÜNÜŞ", chartTitle: "Günəş və Yer · yerli relyefə görə", sun: "Günəş", earth: "Yer", chartFoot: "Günəş və Yer ayrı şkaladadır · 0° = NASA LOLA yerli üfüqü · mənfi = üfüqün altında", siteFacts: "SAHƏ HAQQINDA", officialFeature: "USGS xüsusiyyət diametri", mapResolution: "Topoqrafiya xəritəsi", observerHeight: "Horizons istinad hündürlüyü", lolaElevationLabel: "LOLA yüksəklik · nöqtə", lolaSlopeLabel: "Yamac · 500 m ərazi, P90", avgSunLabel: "LOLA orta Günəş görünüşü", avgEarthLabel: "LOLA orta Yer görünüşü", nearestPsrLabel: "Ən yaxın PSR", lolaTerrainSource: "NASA GSFC · LOLA yüksəklik və yamac ↗", lolaPsrSource: "NASA GSFC · LOLA işıqlanma / PSR ↗", psrHeading: "PSR hədəfi", psrNote: "NASA-nın georeferensli LOLA PSR rasterindən seçilmiş koordinata ən yaxın daimi kölgə məsafəsi hesablanır.", featureSource: "USGS · Mons Mouton qeydi ↗", featureSourceShackleton: "USGS · Shackleton qeydi ↗", heightNote: "* Horizons hündürlüyü seçilmiş istinada görə dəyişir: LZ A üçün +6.0 km komanda girişi, digər nöqtələrdə 0.0 km. LOLA DEM səth relyefini ayrıca ölçür.", modelLimit: "Görünüş NASA LOLA DEM-dən hesablanan yerli skyline və disk radiusu ilə qiymətləndirilir. Kiçik qayalar, relay peyki, radio link büdcəsi, panel temperaturu və eniş təhlükəsizliyi hesablanmır.", methodLink: "Mənbə və model sərhədləri →", compareEyebrow: "SAYT SEÇİMİ · JPL HESABLAMASI", compareTitle: "Eyni tarix.<br /><span>Fərqli nöqtələr.</span>", compareIntro: "Məntəqələri seçin, eyni UTC pəncərəsi üçün Günəş və Yer görünüşünü canlı müqayisə edin.", selectSites: "MÜQAYİSƏYƏ NÖQTƏ SEÇİN", compareHelp: "LZ A-nı Shackleton və ya əlavə etdiyiniz öz koordinatınızla eyni UTC intervalında müqayisə edin.", compareStart: "BAŞLANĞIC", compareDuration: "GÜN", compareButton: "Sahələri müqayisə et", sameWindow: "EYNİ UTC PƏNCƏRƏSİ", compareResults: "Nəticələr", compareEmptyTitle: "Hesablama üçün hazırdır", compareEmptyCopy: "Seçilən məntəqələr JPL Horizons saatlıq məlumatı və NASA LOLA yerli skyline-ı ilə qiymətləndiriləcək.", siteCol: "NÖQTƏ", sunCol: "GÜNƏŞ · h", earthCol: "YER · h", overlapCol: "HƏM İKİSİ · h", energyCol: "ENERJİ · kWh", compareFoot: "Enerji 1 m² üfüqi panelin nəzəri hesabıdır. Balans: normallaşdırılmış enerji və Yer görünüşü 50/50; bu, eniş təhlükəsizliyi balı deyil.", challengeCoverage: "CHALLENGE TƏLƏBLƏRİ", sunlightRequirement: "Günəş işığı", sunlightCoverage: "LOLA yerli üfüqü və Günəş diskinin görünüş pəncərələri.", energyRequirement: "Enerji", energyCoverage: "Panel sahəsi və səmərəliliyi ilə kWh hesabı.", commsRequirement: "Birbaşa rabitə", commsCoverage: "Yer diskinin relyefdən yuxarı görünmə saatları.", terrainRequirement: "Ərazi", terrainCoverage: "LOLA yüksəklik/yamac, skyline və PSR qatı.", compareRequirement: "Sahə və tarix", compareCoverage: "Eyni interval müqayisəsi və 90–365 günlük tarix axtarışı.", sourcesEyebrow: "MƏNBƏLƏR · METOD · SƏRHƏDLƏR", sourcesTitle: "Hər qatın<br /><span>mənbəyi məlumdur.</span>", sourcesIntro: "Navigator rəsmi kataloq koordinatlarını, NASA-nın lunar relyef qatını və JPL-in hesablanmış ephemerisini birləşdirir.", horizonsSource: "Günəş və Yer üçün seçilmiş lunar koordinatdan saatlıq azimut/elevasiya və UTC məlumatı.", lolaSource: "LRO LOLA-dan cənub qütbünün 75°S–90°S rəngli kölgəli relyef qatları; xəritə 30 m/piksel məhsulunu göstərir.", usgsSource: "Mons Mouton: −84.60° (84.60°S), +31.00°E mərkəz koordinatı və 130 km kataloq diametri.", teamDataTitle: "Komanda istinad nöqtələri", teamDataCopy: "İki ayrı komanda istinadı var: əsas nöqtə −84.81° (84.81°S), +38.81°E; LZ A/JPL nöqtəsi −84.81° (84.81°S), +38.15°E və +6.0 km. Tətbiq bu nöqtələri ayrı hesablayır; +38.15°E NASA tərəfindən təsdiqlənmiş eniş koordinatı deyil.", teamBriefLink: "Komanda README ↗", methodSection: "HESABLAMA METODU", visibilityMethod: "Görünüş vaxtı", visibilityCopy: "JPL Horizons azimut/elevasiyası LOLA DEM-dən hesablanan yerli skyline ilə tutuşdurulur. Günəş/Yer diskinin bucaq radiusu qismən görünüş sərhədində nəzərə alınır; keçidlər nümunələr arasında interpolasiya edilir.", energyMethod: "Günəş enerjisi", energyCopy: "1361 W/m² nominal axın × panel sahəsi × səmərəlilik × max(0, sin(Günəş elevasiyası)) × görünən Günəş diskinin payı. Üfüqi panel üçün nəzəri hesabdır; real panel/batareya itkisi yoxdur.", limitsMethod: "Model sərhədləri", limitsCopy: "80/120 m LOLA yer səthi üfüqünü göstərir; kiçik qaya və 5 m SDEM detalları hər nöqtədə yoxdur. Avadanlıq gücü, batareya, radio link büdcəsi, termal rejim və eniş təhlükəsizliyi hesablanmır.", independentNote: "TexnoLead müstəqil NASA Space Apps layihəsidir; NASA tərəfindən təsdiqlənməyib.", footer: "NASA SPACE APPS CHALLENGE 2026 · LUNAR LANDING SITE NAVIGATOR", challengeLink: "Challenge ↗", loading: "NASA/JPL Horizons-dan ephemeris alınır…", compareLoading: "JPL Horizons ilə sahələr müqayisə olunur…", running: "Hesablanır…", onlyTwoSites: "Müqayisə üçün ən azı iki nöqtə seçin.", apiError: "JPL Horizons sorğusu alınmadı. İnterneti yoxlayın və tətbiqi `python3 server.py` ilə başladın.", fileError: "Bu səhifə file:// ilə açılıb. `python3 server.py` başladın, sonra http://127.0.0.1:8000 açın.", noRows: "JPL cavabı alındı, amma saatlıq elevasiya sıralarını oxumaq mümkün olmadı.", chartSource: "NASA/JPL Horizons · müşahidəçi coord@301 · UTC", customSite: "Xəritə koordinatı seçildi. Nəticəni almaq üçün hesablamanı başladın.", mapError: "NASA Moon Trek xəritəsi yüklənmədi. İnterneti yoxlayın.", liveResult: "JPL Horizons + LOLA · {n} saatlıq nümunə / hədəf · {time} UTC", compareDone: "{n} nöqtə JPL Horizons ilə müqayisə edildi.", sunCaption: "{days} gündə LOLA yerli üfüqünə görə Günəş diskinin görünməsi.", earthCaption: "LOLA yerli skyline üstündə Yer diski görünür: {hours}.", overlapCaption: "Günəş və Yer ortaq görünüşü: {hours}.", checking: "NASA / JPL YOXLAYIR", live: "NASA / JPL CANLI", offline: "NASA / JPL ƏLAQƏSİZ", energyCaption: "{area} m² panel · {eff}% səmərəlilik · {days} gün", noSite: "Məntəqə seçilməyib.", rangeError: "Panel sahəsi 0.1–100 m², səmərəlilik 1–50% aralığında olmalıdır.", chooseDate: "Başlanğıc tarixini seçin.", samples: "nümunə", mapReady: "NASA LOLA xəritəsi hazırdır", aboveHorizon: "Həndəsi üfüqdən yuxarı", liveCompareStep: "Müqayisə: {site} · {index}/{total}", siteNames: {team:"Mons Mouton · komanda nöqtəsi",center:"Mons Mouton · USGS mərkəzi",shackleton:"Shackleton · USGS mərkəzi",custom:"Xüsusi xəritə nöqtəsi"}, timelineKicker: "SAATLIQ PƏNCƏRƏLƏR", timelineTitle: "Günəş və Yer nə vaxt görünür?", timelineEmpty: "Horizons və LOLA hesablaması gözlənilir.", terrainWaiting: "NASA LOLA relyef analizi gözlənilir…", terrainLoading: "NASA LOLA relyef və skyline məlumatı yüklənir…", terrainReady: "NASA LOLA · {resolution} m · {radius} km skyline", terrainFallback: "NASA LOLA əlçatan deyil · nəticə həndəsi üfüq üçündür", terrainBadgeWaiting: "LOLA üfüqü hazırlanır", terrainBadgeReady: "LOLA yerli üfüqü", terrainBadgeGeometric: "Həndəsi üfüq", sunTrack: "GÜNƏŞİN DISKİ GÖRÜNÜR", earthTrack: "YERİN DİSKİ GÖRÜNÜR", timelineTerrain: "Sıfır xətti NASA LOLA relyef profilidir; disk radiusu görünüş hesabına daxildir.", searchLoading: "JPL Horizons-dan 6 saatlıq ephemeris alınır və NASA LOLA üfüqü tətbiq olunur…", searchDone: "Ən uyğun {n} tarix tapıldı. Tarixi seçib saatlıq hesablamanı başladın.", searchEmpty: "Bu aralıqda tam missiya pəncərəsi tapılmadı.", bestWindowDate: "BAŞLANĞIC", bestWindowSun: "GÜNƏŞ", bestWindowEarth: "YER", bestWindowOverlap: "ORTAQ", bestWindowEnergy: "ENERJİ", bestWindowScore: "BALANS {score}%", useWindowDate: "Tarixi seç və dəqiq hesabla", balanceCol: "BALANS", terrainProductSource: "Canlı nöqtə analizi: 80 m qütb DEM/yamac; uyğun olmayan əhatədə 120 m LOLA PDS qatı.", illuminationProductSource: "18.6 illik nutation dövrünün orta Günəş/Yer görünüşü və daimi kölgə xəritələri; seçilmiş tarixə bağlı Horizons nəticəsi deyil.", chartAlt: "Günəş və Yer elevasiyası"
  },
  en: {
    eyebrow: "LUNAR SOUTH POLE · MISSION PLANNING", headline: "Choose a landing site.<br /><span>See the sky ahead.</span>", intro: "Explore solar power, Earth visibility, and mission windows with NASA lunar map layers and JPL Horizons calculations.", brief: "Real coordinates · hourly ephemeris · sourced results", missionTab: "Mission planner", compareTab: "Compare sites", sourcesTab: "Data & method", terrainHeading: "NASA LOLA · SOUTH POLAR TOPOGRAPHY", resetMap: "Return to site", psrOn: "PSR layer: on", psrOff: "PSR layer: off", permanentShadow: "Permanent shadow · PSR", mapLoading: "Loading NASA Moon Trek map…", selectedPoint: "SELECTED POINT", landingPoint: "Landing point", lolaRelief: "LOLA shaded relief", permanentShadow: "Permanent shadow · PSR", mapHelp: "Click the map to choose a coordinate. The base is NASA Moon Trek LOLA shaded relief; the blue overlay is NASA’s 120 m permanent-shadow raster.", missionControls: "MISSION PARAMETERS", planWindow: "Calculate a window", siteLabel: "LANDING REFERENCE", eastLongitude: "East longitude", startDate: "START DATE", duration: "DURATION", days: "days", panelModel: "SOLAR PANEL · MODEL", idealPlane: "horizontal · LOLA skyline", calculate: "Calculate window", searchSpanLabel: "FIND THE BEST DATES", findBestWindow: "Find the best mission window", windowScoreNote: "Ranking: ideal energy and Earth visibility, weighted 50% each. A screening aid, not a safety guarantee.", liveNote: "Source: NASA/JPL Horizons · 1-hour step", sunMetricTitle: "SUNLIT DURATION", earthMetricTitle: "EARTH VISIBILITY", energyMetricTitle: "PANEL ENERGY", metricEmpty: "Waiting for JPL Horizons data.", energyEmpty: "Enter area and efficiency to calculate.", chartKicker: "VISIBILITY ABOVE HORIZON", chartTitle: "Sun and Earth · local terrain", sun: "Sun", earth: "Earth", chartFoot: "Separate Sun/Earth scales · 0° = NASA LOLA local skyline · negative = below skyline", siteFacts: "SITE DETAILS", officialFeature: "USGS feature diameter", mapResolution: "Topography map", observerHeight: "Horizons reference altitude", lolaElevationLabel: "LOLA elevation · point", lolaSlopeLabel: "Slope · 500 m area, P90", avgSunLabel: "LOLA average Sun visibility", avgEarthLabel: "LOLA average Earth visibility", nearestPsrLabel: "Nearest PSR", lolaTerrainSource: "NASA GSFC · LOLA elevation and slope ↗", lolaPsrSource: "NASA GSFC · LOLA illumination / PSR ↗", psrHeading: "PSR target", psrNote: "Distance to the nearest permanently shadowed pixel is measured from NASA’s georeferenced LOLA PSR raster.", featureSource: "USGS · Mons Mouton record ↗", heightNote: "* Horizons altitude varies by selected reference: +6.0 km team input for LZ A and 0.0 km for other points. LOLA DEM reports local surface relief separately.", modelLimit: "Visibility uses the local skyline calculated from NASA LOLA DEM and celestial-disc radius. Small rocks, relays, radio-link budget, panel temperature, and landing safety are not calculated.", methodLink: "Sources and model limits →", compareEyebrow: "SITE SELECTION · JPL CALCULATION", compareTitle: "Same date.<br /><span>Different sites.</span>", compareIntro: "Choose locations to compare live Sun and Earth visibility over the same UTC interval.", selectSites: "SELECT LOCATIONS TO COMPARE", compareHelp: "Compare LZ A with Shackleton or a custom coordinate over the same UTC interval.", compareStart: "START DATE", compareDuration: "DAYS", compareButton: "Compare sites", sameWindow: "SAME UTC WINDOW", compareResults: "Results", compareEmptyTitle: "Ready to calculate", compareEmptyCopy: "Selected sites are evaluated with hourly JPL Horizons data and the NASA LOLA local skyline.", siteCol: "SITE", sunCol: "SUN · h", earthCol: "EARTH · h", overlapCol: "BOTH · h", energyCol: "ENERGY · kWh", compareFoot: "Energy is a theoretical estimate for a 1 m² horizontal panel. Balance weights normalized energy and Earth visibility 50/50; it is not a landing-safety score.", challengeCoverage: "CHALLENGE REQUIREMENTS", sunlightRequirement: "Sunlight", sunlightCoverage: "Solar-disc windows above the NASA LOLA local skyline.", energyRequirement: "Power", energyCoverage: "kWh estimate from panel area and efficiency.", commsRequirement: "Direct communications", commsCoverage: "Hours when the Earth disc clears local terrain.", terrainRequirement: "Terrain", terrainCoverage: "LOLA elevation/slope, skyline, and PSR layer.", compareRequirement: "Sites and dates", compareCoverage: "Same-interval site comparison and 90–365 day date search.", sourcesEyebrow: "SOURCES · METHOD · LIMITS", sourcesTitle: "Every layer<br /><span>has a source.</span>", sourcesIntro: "The navigator combines catalog coordinates, a NASA lunar terrain layer, and JPL-computed ephemerides.", horizonsSource: "Hourly azimuth/elevation and UTC values for the Sun and Earth from the selected lunar coordinate.", lolaSource: "Color shaded relief from LRO LOLA covering 75°S–90°S; the map displays the 30 m/pixel product.", usgsSource: "Mons Mouton: center at −84.60° (84.60°S), +31.00°E and catalog diameter of 130 km.", teamDataTitle: "Team reference points", teamDataCopy: "There are two distinct team references: the main point at −84.81° (84.81°S), +38.81°E, and the LZ A/JPL point at −84.81° (84.81°S), +38.15°E with +6.0 km altitude. The app calculates them separately; +38.15°E is not a NASA-certified landing coordinate.", teamBriefLink: "Open team README ↗", methodSection: "CALCULATION METHOD", visibilityMethod: "Visibility duration", visibilityCopy: "JPL Horizons azimuth/elevation is compared with the local skyline derived from LOLA DEM. The Sun/Earth angular disk radius is included for partial visibility; crossings between samples are interpolated.", energyMethod: "Solar energy", energyCopy: "1361 W/m² nominal flux × panel area × efficiency × max(0, sin(Sun elevation)) × visible fraction of the solar disc. A theoretical horizontal-panel estimate; hardware and battery losses are excluded.", limitsMethod: "Model limits", limitsCopy: "The 80/120 m LOLA terrain does not resolve every boulder or provide 5 m detail everywhere. Lander hardware, battery, radio link budget, thermal duty, and landing safety are not calculated.", independentNote: "TexnoLead is an independent NASA Space Apps project and is not endorsed by NASA.", footer: "NASA SPACE APPS CHALLENGE 2026 · LUNAR LANDING SITE NAVIGATOR", challengeLink: "Challenge ↗", loading: "Requesting ephemerides from NASA/JPL Horizons…", compareLoading: "Comparing sites with JPL Horizons…", running: "Calculating…", onlyTwoSites: "Select at least two locations to compare.", apiError: "The JPL Horizons request failed. Check internet access and start the app with `python3 server.py`.", fileError: "This page was opened with file://. Run `python3 server.py`, then open http://127.0.0.1:8000.", noRows: "JPL responded, but the hourly elevation series could not be read.", chartSource: "NASA/JPL Horizons · observer coord@301 · UTC", customSite: "Map coordinate selected. Calculate to request results.", mapError: "NASA Moon Trek map failed to load. Check internet access.", liveResult: "JPL Horizons + LOLA · {n} hourly samples / target · {time} UTC", compareDone: "Compared {n} locations with JPL Horizons.", sunCaption: "Solar-disc visibility above the LOLA local skyline over {days} days.", earthCaption: "Earth-disc visibility above the LOLA local skyline: {hours}.", overlapCaption: "Sun + Earth overlap: {hours}.", checking: "NASA / JPL CHECKING", live: "NASA / JPL LIVE", offline: "NASA / JPL OFFLINE", energyCaption: "{area} m² panel · {eff}% efficiency · {days} days", noSite: "No location selected.", rangeError: "Panel area must be 0.1–100 m² and efficiency 1–50%.", chooseDate: "Choose a start date.", samples: "samples", mapReady: "NASA LOLA map ready", aboveHorizon: "Above geometric horizon", liveCompareStep: "Comparing {site} · {index}/{total}", siteNames: {team:"Mons Mouton · team point",center:"Mons Mouton · USGS center",shackleton:"Shackleton · USGS center",custom:"Custom map point"}, timelineKicker: "HOURLY WINDOWS", timelineTitle: "When are the Sun and Earth visible?", timelineEmpty: "Waiting for Horizons and LOLA analysis.", terrainWaiting: "Waiting for NASA LOLA terrain analysis…", terrainLoading: "Loading NASA LOLA terrain and skyline data…", terrainReady: "NASA LOLA · {resolution} m · {radius} km skyline", terrainFallback: "NASA LOLA unavailable · geometric-horizon result", terrainBadgeWaiting: "Building LOLA skyline", terrainBadgeReady: "LOLA local skyline", terrainBadgeGeometric: "Geometric horizon", sunTrack: "SOLAR DISC VISIBLE", earthTrack: "EARTH DISC VISIBLE", timelineTerrain: "Zero is the NASA LOLA local skyline; body-disc radius is included in visibility.", searchLoading: "Requesting 6-hour JPL Horizons ephemerides and applying NASA LOLA skyline…", searchDone: "Found {n} candidate dates. Select one to run the precise hourly calculation.", searchEmpty: "No complete mission window was found in this range.", bestWindowDate: "START", bestWindowSun: "SUN", bestWindowEarth: "EARTH", bestWindowOverlap: "OVERLAP", bestWindowEnergy: "ENERGY", bestWindowScore: "BALANCE {score}%", useWindowDate: "Select date and calculate precisely", balanceCol: "BALANCE", terrainProductSource: "Live point analysis: 80 m polar DEM/slope; 120 m LOLA PDS where the higher-resolution coverage does not apply.", illuminationProductSource: "18.6-year nutation-cycle average Sun/Earth visibility and permanent-shadow maps; not date-specific Horizons results.", chartAlt: "Sun and Earth elevation"
  }
};

Object.assign(strings.az, {
  headline: "Eniş sahəsini seç.<br /><span>Tarix pəncərəsini yoxla.</span>", intro: "NASA LOLA relyefi və JPL Horizons məlumatı ilə Günəş enerjisini, Yer görünüşünü və seçilmiş tarix aralığını hesablayın.",
  psrAlertCopy: "LOLA bu nöqtəni PSR kimi işarələyir. Bu koordinat üçün sıfır işıqlanma gözlənilən nəticədir. Enerji və rabitə üçün yaxın işıqlı dayaq nöqtəsi seçib hesablamanı təkrarlayın.",
  missionStoryLead: "Mons Mouton NASA-nın Artemis III üçün araşdırdığı namizəd bölgələrdəndir; bu, yekun eniş nöqtəsinin seçildiyi demək deyil. Məqsəd PSR-ə yaxın, yamacı və işıqlanması missiya tarixlərinə görə yoxlanmış işıqlı dayaq sahəsi tapmaqdır.",
  storyStageTitle: "İşıqlı sahədə dayaq nöqtəsi",
  profileTitle: "POWER / LINK FƏRZİYYƏLƏRİ · aç", loadLabel: "Orta sistem yükü", batteryLabel: "Batareya tutumu", earthMarginLabel: "Yer mərkəzi üçün minimum bucaq", profileNote: "Dəyişdirilə bilən ilkin dizayn fərziyyələridir, lander spesifikasiyası deyil.", decemberCheck: "1–30 dekabr 2026-nı LZ A-da yoxla", psrTargetTooltip: "Ən yaxın xəritələnmiş PSR · buz təsdiqi deyil", batteryDisabled: "Batareya modeli söndürülüb.",
  missionStoryKicker: "ELMİ HƏDƏF · ƏMƏLİYYAT SƏNARİSİ", missionStoryTitle: "İşıqda yerləş. Kölgədə nümunə axtar.", artemisSource: "NASA · Artemis namizəd bölgələri ↗", missionStoryLead: "Mons Mouton NASA-nın Artemis III üçün araşdırdığı namizəd bölgələrdəndir; bu, yekun eniş nöqtəsi seçilib demək deyil. Hədəf: PSR-ə yaxın, yamacı və işıqlanması ayrıca qiymətləndirilən staging sahəsi.", storyStageTitle: "İşıqlı sahədə staging", storyStageCopy: "Günəş enerjisini və Yerə görünüşü konkret tarixə görə ölç; yamac və relyefi ayrıca yoxla.", storyPsrTitle: "PSR-də uçucu maddə axtarışı", storyPsrCopy: "Daimi kölgə su buzu və başqa uçucuların qorunmasına imkan verə bilər; PSR xəritə hüceyrəsi buzun təsdiqi deyil.", storyTraverseTitle: "İşıqdan kölgəyə ölçülən keçid", storyTraverseCopy: "Nöqtəli xətt eniş nöqtəsindən ən yaxın NASA LOLA PSR pikselinə düz xətt məsafəsidir; rover üçün keçilə bilən marşrut deyil.", mappedPsrDistance: "Ən yaxın xəritələnmiş PSR pikseli", psrRouteWaiting: "NASA LOLA analizi gözlənilir", psrRouteNone: "20 km-də xəritələnmiş PSR tapılmadı", focusPsr: "Marşrutu xəritədə göstər", psrScienceCaveat: "NASA bəzi PSR-lərdə temperaturun təxminən −203°C-yə enə bildiyini bildirir; dəyər sahəyə görə dəyişir. Bu tətbiq seçilmiş PSR üçün Diviner temperaturunu və buzun mövcudluğunu ölçmür.", psrTempSource: "NASA · Ay səthinin mühiti ↗",
  budgetKicker: "SADƏLƏŞDİRİLMİŞ ENERJİ / RABİTƏ SƏNARİSİ", budgetTitle: "Bu missiya profili pəncərəni keçirə bilərmi?", exportMission: "Missiya JSON-u endir", loadEnergyLabel: "Missiyanın sərfiyyatı", netEnergyLabel: "Net enerji", netEnergyNote: "İstehsal − yük; batareya itkisi daxil deyil.", batteryReserveLabel: "Batareya simulyasiyası", linkHoursLabel: "Yer mərkəzi görünürlük marjası", budgetCaveat: "İdeal panel və saatlıq nümunə; batareya dolu başlayır. Panel temperaturu, çevirmə itkisi, aparat limitləri və radio-link büdcəsi daxil deyil. Yer bucaq marjası birbaşa rabitə zəmanəti deyil.",
  loadEnergyNote: "{w} W orta yük · {days} gün", energyNetPositive: "Yükdən sonra nəzəri qalıq", energyNetNegative: "Yükü ödəmək üçün nəzəri kəsir", batteryNoOutage: "Bu fərziyyələrlə enerji çatışmazlığı yaranmadı.", batteryOutage: "Enerji çatışmazlığı: {hours} saat", batteryReserveEnd: "sonda batareya {pct}%", linkHoursText: "Yer mərkəzi yerli üfüqdən {margin}° yuxarı · disk görünüşündən konservativdir.", linkTrack: "YER MƏRKƏZİ ≥ {margin}°", linkCol: "YER ≥ BUCAQ · h", bestWindowLink: "LINK", compareFoot: "Balans: ideal enerji və Yer mərkəzinin {margin}° clearance marjası, hər biri 50%. Bu, eniş təhlükəsizliyi balı deyil.", windowScoreNote: "Axtarış balı: enerji və Yer mərkəzinin {margin}° üfüq marjası, hərəsi 50%; ilkin seçimdir, təhlükəsizlik balı deyil.", rangeError: "Panel: 0.1–100 m², səmərəlilik: 1–50%, yük: 0–10 000 W, batareya: 0–100 000 Wh, Yer marjası: 0–30° olmalıdır.", exportReady: "Saatlıq sətirlər və model fərziyyələri JSON-a yazıldı.", exportMissing: "Əvvəl missiya pəncərəsini hesablayın.", decemberStatus: "LZ A üçün 1–30 dekabr 2026 intervalı NASA/JPL ilə hesablanır.",
  scoutTitle: "NASA LOLA · NAMİZƏD SAHƏLƏRİN İLKİN SKANI", scoutRadius: "Radius", scoutStep: "Şəbəkə addımı", scoutMetric: "Rənglə göstər", scoutSun: "Orta Günəş görünüşü", scoutEarth: "Orta Yer görünüşü", scoutSlope: "LOLA yamacı", scoutButton: "Sahəni skan et", scoutLow: "AŞAĞI", scoutHigh: "YUXARI", scoutNote: "Bu ilkin skandır; kliklənən nöqtə tarixə bağlı JPL Horizons və LOLA üfüqü ilə ayrıca hesablanır.", scoutLoading: "NASA LOLA rasterləri oxunur…", scoutDone: "{n} namizəd nöqtə · NASA-nın 18.6 illik ortalaması · kliklə ətraflı hesabla.", scoutError: "Namizəd skanı alınmadı: {error}"
});
Object.assign(strings.en, {
  headline: "Choose a landing area.<br /><span>Check its mission window.</span>", intro: "Use NASA LOLA terrain and JPL Horizons data to calculate solar energy, Earth visibility, and the selected date interval.",
  profileTitle: "POWER / LINK ASSUMPTIONS · open", loadLabel: "Average system load", batteryLabel: "Battery capacity", earthMarginLabel: "Minimum Earth-center elevation", profileNote: "Editable first-pass design assumptions, not lander specifications.", decemberCheck: "Check Dec 1–30, 2026 at LZ A", psrTargetTooltip: "Nearest mapped PSR · not an ice confirmation", batteryDisabled: "Battery model is disabled.",
  missionStoryKicker: "SCIENCE TARGET · OPERATIONS SCENARIO", missionStoryTitle: "Stage in light. Sample in shadow.", artemisSource: "NASA · Artemis candidate regions ↗", missionStoryLead: "Mons Mouton is among the regions NASA studied for Artemis III; that does not make this team coordinate a selected landing site. The goal is to find a staging area near a PSR whose slope and illumination are checked for the chosen mission dates.", storyStageTitle: "Stage on illuminated terrain", storyStageCopy: "Measure solar power and Earth visibility for the selected dates; assess slope and terrain separately.", storyPsrTitle: "Search for volatiles in a PSR", storyPsrCopy: "Permanent shadow can preserve water ice and other volatiles; a mapped PSR cell does not confirm ice.", storyTraverseTitle: "Measure the light-to-shadow leg", storyTraverseCopy: "The dotted line is straight-line distance from the landing reference to the nearest NASA LOLA PSR pixel; it is not a traversable rover route.", mappedPsrDistance: "Nearest mapped PSR pixel", psrRouteWaiting: "Waiting for NASA LOLA analysis", psrRouteNone: "No mapped PSR within 20 km", focusPsr: "Show route on map", psrScienceCaveat: "NASA reports that some PSRs can reach about −203°C; temperatures vary by location. This app does not report Diviner temperature or confirm ice at the selected PSR.", psrTempSource: "NASA · Moonbase environment ↗",
  budgetKicker: "SIMPLIFIED POWER / COMMS SCENARIO", budgetTitle: "Can this mission profile ride out the window?", exportMission: "Download mission JSON", loadEnergyLabel: "Mission energy demand", netEnergyLabel: "Net energy", netEnergyNote: "Generation − load; battery losses excluded.", batteryReserveLabel: "Battery simulation", linkHoursLabel: "Earth-center visibility margin", budgetCaveat: "Ideal panel and hourly samples; battery starts full. Panel temperature, conversion losses, hardware limits, and radio link budget are excluded. Earth-angle margin is not a direct-communications guarantee.",
  loadEnergyNote: "{w} W average load · {days} days", energyNetPositive: "Theoretical energy after load", energyNetNegative: "Theoretical energy shortfall", batteryNoOutage: "No energy shortfall under these assumptions.", batteryOutage: "Energy shortfall: {hours} hours", batteryReserveEnd: "battery ends at {pct}%", linkHoursText: "Earth center ≥ {margin}° above local horizon; stricter than disc visibility.", linkTrack: "EARTH CENTER ≥ {margin}°", linkCol: "EARTH MARGIN · h", bestWindowLink: "LINK", compareFoot: "Balance: normalized ideal energy and Earth-center clearance of {margin}°, weighted 50/50. Not a landing-safety score.", windowScoreNote: "Search index: ideal energy and Earth-center clearance ≥ {margin}°, weighted equally; screening only, not safety.", rangeError: "Panel area: 0.1–100 m², efficiency: 1–50%, load: 0–10,000 W, battery: 0–100,000 Wh, Earth margin: 0–30°.", exportReady: "Hourly samples and model assumptions are included in the JSON.", exportMissing: "Calculate a mission window first.", decemberStatus: "Calculating Dec 1–30, 2026 at LZ A with NASA/JPL.",
  scoutTitle: "NASA LOLA · CANDIDATE AREA PRE-SCREEN", scoutRadius: "Radius", scoutStep: "Grid step", scoutMetric: "Color by", scoutSun: "Average Sun visibility", scoutEarth: "Average Earth visibility", scoutSlope: "LOLA slope", scoutButton: "Scan this area", scoutLow: "LOWER", scoutHigh: "HIGHER", scoutNote: "This is a pre-screen. Clicking a cell runs a separate date-specific JPL Horizons and LOLA horizon analysis.", scoutLoading: "Reading NASA LOLA rasters…", scoutDone: "{n} candidate cells · NASA 18.6-year average · click for detailed analysis.", scoutError: "Could not scan candidate cells: {error}"
});

strings.az.siteNames.landingA = "Mons Mouton · Eniş Zonası A";
strings.en.siteNames.landingA = "Mons Mouton · Landing Zone A";

Object.assign(strings.az, {
  compareTeamName: "Mons Mouton · komanda nöqtəsi", compareLandingAName: "Mons Mouton · Eniş Zonası A", compareCenterName: "Mons Mouton · USGS mərkəzi", compareShackletonName: "Shackleton · USGS mərkəzi",
  teamDataTitle: "Komanda istinad nöqtələri", teamDataCopy: "İki ayrı komanda istinadı var: əsas nöqtə −84.81° (84.81°S), +38.81°E; LZ A/JPL nöqtəsi −84.81° (84.81°S), +38.15°E və +6.0 km. Tətbiq hər birini öz koordinatı ilə hesablayır. +38.15°E komanda qeydi kimi verilib, NASA tərəfindən təsdiqlənmiş eniş koordinatı deyil.", heightNote: "* Horizons-a verilən hündürlük seçilmiş istinada görə dəyişir: LZ A üçün komanda dəyəri +6.0 km, başqa nöqtələrdə 0.0 km. Bu komanda fərziyyəsidir; LOLA DEM səth relyefini ayrıca ölçür.",
  teamRefsTitle: "Komandanın təqdim etdiyi rəqəmlər · aç", monsMoutonElevationSource: "NASA SVS · Mons Mouton və ətraf relyef hündürlüyü ↗", teamRefSiteLabel: "Nöqtələr və relyef", teamRefSiteCopy: "Əsas komanda nöqtəsi −84.81° (84.81°S), +38.81°E; ayrıca LZ A/JPL istinadı −84.81° (84.81°S), +38.15°E, +6.0 km. 6 km Horizons hündürlüyü yalnız LZ A üçün komanda girişidir. NASA Mons Mouton-un ətraf relyefdən təxminən 6,000 m qalxdığını bildirir; bu, həmin koordinatın mütləq hündürlüyü demək deyil. 130 km diametr USGS kataloqundan götürülüb.", teamRefSlopeLabel: "Eniş sahəsi yamacı", teamRefSlopeCopy: "Komanda qeydi: orta yamac 32°; eyni qeyddə 2.5°–5.0° aralığı da var. Hansı ölçüyə aid olduğu açıqlanmadığı üçün bunlar təhlükəsiz eniş həddi kimi şərh edilmir. 500 m radiuslu düz zona təsdiqlənmiş təhlükəsizlik sərhədi deyil.", teamRefPsrLabel: "PSR tədqiqat hədəfi", teamRefPsrCopy: "Komanda hədəfi: 1.2 km diametrli krater, LOLA xəritəsində ən azı 1 km² PSR və LZ A-dan təxminən 3.8 km məsafə. Bunlar seçilmiş koordinat üçün canlı ölçü deyil; tətbiq ən yaxın PSR pikselinə məsafəni ayrıca hesablayır. PSR buzun mövcudluğunu təsdiqləmir.", teamRefThermalLabel: "Temperatur qeydləri", teamRefThermalCopy: "Komanda qeydi: yay orta −73°C (~200 K), qış/kölgə orta −163°C (~110 K), PSR təxmini −228°C (~45 K); verilən fərq 90°C = 90 K. Bunlar burada Diviner-dən alınmış nöqtəvi ölçü kimi təqdim edilmir. “Yüksək istilik batareyası sabitliyi” hesablanmır.",
  customPointHeading: "ÖZ KOORDİNATINI ƏLAVƏ ET", roadmapNav: "Gələcək xəritə", thermalMetricTitle: "TERMAL SABİTLİK · KOMANDA QEYDİ", thermalStatusValue: "Yüksək", thermalStatusContext: "komanda qiyməti", thermalSummary: "ΔT 90°C (90 K) · yay −73°C (~200 K) · qış/kölgə −163°C (~110 K) · PSR təxmini −228°C (~45 K). Komandanın verdiyi təxmini qiymətlər; batareyanın termal sabitliyi bu tətbiqdə hesablanmır.", landingPopupTitle: "Mons Mouton platosu · Eniş Zonası A", landingPsrTarget: "PSR-də mümkün su buzu hədəfi: eniş nöqtəsindən təxminən 3.8 km.", landingPsrCaveat: "3.8 km komanda təxminidir; buzun mövcudluğu təsdiqlənməyib.", roadmapTitle: "Gələcək xəritə · hakatondan sonrakı missiya arxitekturası", roadmapIntro: "Bu üç mərhələ hakatondan sonrakı inkişaf planıdır; hazırkı tətbiqdə hələ həyata keçirilməyib.", roadmapPhase1Title: "Mərhələ 1 · Qabaqcıl astronomiya izləməsinin avtomatlaşdırılması · növbəti 3 ay", roadmapPhase1Copy: "JPL Horizons ephemeridini genişləndirərək Ay librasiyasını və Yer diskinin görünüşünü modelləşdirmək, tək hesablamanın hazırkı 31 günlük həddindən uzun proqnozlar yaratmaq. Rabitə proqnozlarını istinad ephemerisləri ilə yoxlamaq.", roadmapPhase2Title: "Mərhələ 2 · Resurs perspektivliyi və PSR sərhədləri · növbəti 6 ay", roadmapPhase2Copy: "LRO LEND-in hidrogenə həssas siqnallarını Diviner temperatur məhsulları ilə georeferensli şəkildə tutuşduraraq qeyri-müəyyənliyi göstərilən buz-perspektivlik qatları hazırlamaq. PSR kənarlarını və dik yamac risklərini xəritələyib geofence xəbərdarlıqları əlavə etmək; LEND-in məkan ayırdetməsi 1 km² PSR-dən kobud olduğuna görə qatlarda məkan miqyası və qeyri-müəyyənlik göstəriləcək; nəticə buz sıxlığının birbaşa ölçüsü sayılmayacaq.", roadmapPhase3Title: "Mərhələ 3 · Avtonom marşrut namizədləri və maneə aşkarlanması · növbəti 1 il", roadmapPhase3Copy: "Yüksək ayırdetməli LROC görüntülərində iri daş və digər təhlükə namizədlərini işarələmək, rover məhdudiyyətləri və relyefə əsaslanan AI-yardımlı marşrut namizədləri yaratmaq. Qırmızı işarələr yoxlanmalı namizədlər olacaq; planlaşdırıcı yamac, maneə, davamlı Günəş altında qalma müddəti və roverin termal limitlərini nəzərə alacaq. Təhlükəsizliyə zəmanət verməyəcək.", roadmapSourcesLabel: "Planın mənbə bazası:",
  compareHelp: "NASA bu challenge üçün sabit sayda nöqtə təyin etmir. Kataloq istinadlarını seçin və istənilən cənub qütbü koordinatını əlavə edin.",
  comparePointName: "NÖQTƏ ADI", compareLatitude: "ENLİK · onluq dərəcə", compareEastLongitude: "ŞƏRQ UZUNLUĞU · 0–360°", compareAddPoint: "Koordinatı əlavə et", comparePointHelp: "Enlik -90° ilə -75° arasında; şərq uzunluğu 0°–360° arasında olmalıdır.", comparePointDefaultName: "Namizəd nöqtə", compareRemovePoint: "Nöqtəni sil", comparePointRange: "Cənub qütbü əhatəsi üçün enliyi -90°…-75°, şərq uzunluğunu 0°…360° daxil edin.", compareDuplicatePoint: "Bu koordinat siyahıdadır.",
  visibilityAlertTitle: "Bu intervalda birbaşa görünüş yoxdur", visibilityAlertSun: "Günəş diski seçilmiş intervalda LOLA yerli üfüqündən görünməyib; hesablanan panel enerjisi sıfırdır.", visibilityAlertEarth: "Yer diski seçilmiş intervalda LOLA yerli üfüqündən görünməyib.", psrAlertTitle: "Koordinat daimi kölgə sahəsindədir", psrAlertCopy: "LOLA bu nöqtəni PSR kimi işarələyir. Sıfır işıqlanma bu koordinat üçün nəticədir; enerji və rabitə üçün yaxın işıqlı staging nöqtəsini seçib yenidən hesablayın.", inputsChanged: "Parametrlər dəyişdi; yeni seçim üçün hesab yenidən başladılır.",
});
Object.assign(strings.en, {
  compareTeamName: "Mons Mouton · team point", compareLandingAName: "Mons Mouton · Landing Zone A", compareCenterName: "Mons Mouton · USGS center", compareShackletonName: "Shackleton · USGS center",
  teamDataTitle: "Team reference points", teamDataCopy: "There are two distinct team references: the main point at −84.81° (84.81°S), +38.81°E, and the LZ A/JPL point at −84.81° (84.81°S), +38.15°E with +6.0 km altitude. The app calculates each at its own coordinates. +38.15°E is a team reference, not a NASA-certified landing coordinate.", heightNote: "* Horizons altitude follows the selected reference: the team value is +6.0 km for LZ A and 0.0 km for other points. This is a team assumption; LOLA DEM reports surface relief separately.",
  teamRefsTitle: "Team-provided reference values · open", monsMoutonElevationSource: "NASA SVS · Mons Mouton relief height ↗", teamRefSiteLabel: "Coordinates and relief", teamRefSiteCopy: "Main team point: −84.81° (84.81°S), +38.81°E; separate LZ A/JPL reference: −84.81° (84.81°S), +38.15°E, +6.0 km. The 6 km Horizons altitude is a team input used only for LZ A. NASA describes Mons Mouton as roughly 6,000 m above surrounding terrain; that does not establish the absolute elevation at this coordinate. The 130 km diameter is from the USGS catalog.", teamRefSlopeLabel: "Landing-area slope", teamRefSlopeCopy: "The team note says 32° average slope and also gives a 2.5°–5.0° range. It does not say what the range describes, so these values are not treated as a safe landing limit. The 500 m flat-zone radius is not a certified safety boundary.", teamRefPsrLabel: "PSR science target", teamRefPsrCopy: "Team target: a 1.2 km crater, at least 1 km² of LOLA-mapped PSR, and about 3.8 km from LZ A. These are not live measurements at the selected coordinate; the app separately calculates distance to the nearest mapped PSR pixel. A PSR does not confirm ice.", teamRefThermalLabel: "Temperature notes", teamRefThermalCopy: "Team values: summer mean −73°C (~200 K), winter/shadow mean −163°C (~110 K), and PSR estimate −228°C (~45 K); the stated 90°C swing equals 90 K. These are not shown as Diviner point measurements. “High thermal-battery stability” is not calculated.",
  customPointHeading: "ADD A COORDINATE", roadmapNav: "Future Map", thermalMetricTitle: "THERMAL STABILITY · TEAM ESTIMATE", thermalStatusValue: "High", thermalStatusContext: "team-reported", thermalSummary: "ΔT 90°C (90 K) · lunar summer −73°C (~200 K) · winter/shadow −163°C (~110 K) · PSR estimate −228°C (~45 K). Team-provided estimates; battery thermal stability is not calculated in this app.", landingPopupTitle: "Mons Mouton Plateau Landing Site Zone A", landingPsrTarget: "Possible water-ice target in a PSR: approximately 3.8 km from this landing zone.", landingPsrCaveat: "The 3.8 km distance is a team estimate; water ice is not confirmed.", roadmapTitle: "Future Map · Post-Hackathon Mission Architecture", roadmapIntro: "These three phases are a post-hackathon plan; they are not implemented in the current app.", roadmapPhase1Title: "Phase 1 · Advanced astronomy tracking automation · next 3 months", roadmapPhase1Copy: "Build on JPL Horizons ephemerides by modeling lunar libration and Earth-disc visibility, then extend forecasts beyond the current 31-day single-run limit. Validate longer-range communications forecasts against reference ephemerides.", roadmapPhase2Title: "Phase 2 · Resource prospectivity and PSR boundaries · next 6 months", roadmapPhase2Copy: "Georeference and cross-reference hydrogen-sensitive LRO LEND signals with Diviner temperature products to create water-ice prospectivity layers with uncertainty. Map PSR edges and steep-slope risks and add geofence alerts; LEND has a coarser spatial footprint than an individual 1 km² PSR, so the layers will report scale and uncertainty rather than direct ice-density measurements.", roadmapPhase3Title: "Phase 3 · Autonomous route candidates and hazard detection · next 1 year", roadmapPhase3Copy: "Flag candidate boulders and other hazards in high-resolution LROC imagery, then generate AI-assisted route candidates using rover constraints and terrain. Red markers will be candidate detections for review; route planning will account for slope, obstacles, continuous-sun exposure limits, and rover thermal operating limits. It will not guarantee safety.", roadmapSourcesLabel: "Planned data references:",
  compareHelp: "NASA does not prescribe a fixed number of points for this challenge. Choose catalog references and add any south-polar coordinate.",
  comparePointName: "POINT NAME", compareLatitude: "LATITUDE · decimal degrees", compareEastLongitude: "EAST LONGITUDE · 0–360°", compareAddPoint: "Add coordinate", comparePointHelp: "Latitude must be between −90° and −75°; east longitude between 0° and 360°.", comparePointDefaultName: "Candidate point", compareRemovePoint: "Remove point", comparePointRange: "Enter latitude −90°…−75° and east longitude 0°…360° for south-polar coverage.", compareDuplicatePoint: "This coordinate is already in the list.",
  visibilityAlertTitle: "No direct view in this window", visibilityAlertSun: "The Sun disc did not clear the LOLA local skyline during this interval, so calculated panel energy is zero.", visibilityAlertEarth: "The Earth disc did not clear the LOLA local skyline during this interval.", psrAlertTitle: "This coordinate is in permanent shadow", psrAlertCopy: "LOLA marks this point as a PSR. Zero illumination is the result for this coordinate; choose a nearby sunlit staging point and calculate again for power and communications.", inputsChanged: "Inputs changed; recalculating with the current selection.",
});

Object.assign(strings.az, {
  terrainUnavailableShort: "Əlçatan deyil",
  psrUnavailableNote: "NASA LOLA relyef və PSR analizi alınmadı. Missiya hesablamasında sadə həndəsi üfüq istifadə olunur.",
});
Object.assign(strings.en, {
  terrainUnavailableShort: "Unavailable",
  psrUnavailableNote: "NASA LOLA terrain and PSR analysis could not be loaded. Mission calculations use a simple geometric horizon.",
});

const state = { language: "az", currentSite: "landingA", lastData: null, compareData: null, comparePoints: [], nextComparePoint: 1, missionRerunQueued: false, busy: false, compareBusy: false, searchBusy: false, scoutBusy: false, scoutData: null, scoutLayer: null, map: null, marker: null, psrLayer: null, psrTargetMarker: null, psrRouteLine: null, psrVisible: true, mapReady: false, dataStatus: "checking", siteAnalysis: null, analysisCache: new Map(), analysisRequests: new Map() };
const $ = (selector, root = document) => {
  const element = root.querySelector(selector);
  if (!element) throw new Error(`Missing page element: ${selector}`);
  return element;
};
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const t = (key) => strings[state.language][key] ?? strings.az[key] ?? key;
const siteName = (site) => t("siteNames")[site.id] || (state.language === "az" ? site.nameAz : site.nameEn) || site.nameEn;

function applyLanguage() {
  document.documentElement.lang = state.language;
  $$('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    const value = t(key);
    if (["headline", "compareTitle", "sourcesTitle"].includes(key)) element.innerHTML = value;
    else element.textContent = value;
  });
  $("#languageToggle").textContent = state.language === "az" ? "EN" : "AZ";
  const optionIds = ["team", "landingA", "center", "shackleton", "custom"];
  optionIds.forEach((id, index) => { $("#siteSelect").options[index].textContent = t("siteNames")[id]; });
  $("#durationValue").textContent = $("#duration").value;
  [...$("#searchSpan").options].forEach((option) => { option.textContent = state.language === "az" ? `${option.value} gün` : `${option.value} days`; });
  $("#workspaceDate").textContent = `UTC · ${new Date().getUTCFullYear()}`;
  $("#liveBadgeText").textContent = t(state.dataStatus);
  $("#chartSource").textContent = t("chartSource");
  $("#compareFoot").textContent = t("compareFoot").replace("{margin}", $("#earthMarginDeg").value);
  $("#scoreNote").textContent = t("windowScoreNote").replace("{margin}", $("#earthMarginDeg").value);
  refreshSite();
  updatePsrToggle();
  if (state.lastData) renderMissionData(state.lastData);
  if (state.compareData) renderComparison(state.compareData);
  if (state.bestWindows) renderBestWindows(state.bestWindows);
  renderCustomComparePoints();
  if (state.mapReady) setMapStatus(t("mapReady"), true);
}

function formatLat(lat) { return `${lat < 0 ? "−" : "+"}${Math.abs(lat).toFixed(2)}°${lat < 0 ? "S" : "N"}`; }
function formatLon(lon) { return `+${((lon % 360 + 360) % 360).toFixed(2)}°E`; }
function createSitePopup(site) {
  const root = document.createElement("div");
  root.className = "site-popup";
  const title = document.createElement("strong");
  title.textContent = site.id === "landingA" ? t("landingPopupTitle") : siteName(site);
  const coordinates = document.createElement("p");
  coordinates.textContent = `Lat: ${formatLat(site.lat)} · Lon: ${formatLon(site.lon)}`;
  root.append(title, coordinates);
  if (site.id === "landingA") {
    const target = document.createElement("p");
    target.textContent = t("landingPsrTarget");
    const caveat = document.createElement("small");
    caveat.textContent = t("landingPsrCaveat");
    root.append(target, caveat);
  }
  return root;
}
function getCurrentSite() { return sites[state.currentSite]; }
function siteKey(site) { return `${Number(site.lat).toFixed(4)},${Number(site.lon).toFixed(4)}`; }

function clearComparisonResults() {
  state.compareData = null;
  $("#comparisonRows").innerHTML = "";
  $("#compareEmpty").classList.remove("is-hidden");
  $("#comparisonTableWrap").classList.add("is-hidden");
  setStatus($("#compareStatus"), "");
}

function renderCustomComparePoints() {
  const container = $("#customComparePoints");
  container.replaceChildren();
  for (const site of state.comparePoints) {
    const row = document.createElement("div");
    row.className = "site-option custom-site-option";
    const choice = document.createElement("label");
    choice.className = "custom-point-choice";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox"; checkbox.value = site.id; checkbox.checked = true;
    checkbox.addEventListener("change", clearComparisonResults);
    const checkmark = document.createElement("span"); checkmark.className = "checkmark";
    const details = document.createElement("span");
    const name = document.createElement("strong"); name.textContent = siteName(site);
    const coordinates = document.createElement("small"); coordinates.textContent = `${formatLat(site.lat)} · ${formatLon(site.lon)}`;
    details.append(name, coordinates);
    const tag = document.createElement("em"); tag.textContent = state.language === "az" ? "İSTİFADƏÇİ" : "USER";
    const remove = document.createElement("button");
    remove.className = "remove-point-button"; remove.type = "button"; remove.textContent = "×";
    remove.setAttribute("aria-label", `${t("compareRemovePoint")}: ${siteName(site)}`);
    remove.title = t("compareRemovePoint");
    remove.addEventListener("click", (event) => {
      event.preventDefault(); event.stopPropagation();
      state.comparePoints = state.comparePoints.filter((point) => point.id !== site.id);
      renderCustomComparePoints(); clearComparisonResults();
    });
    choice.append(checkbox, checkmark, details, tag);
    row.append(choice, remove);
    container.append(row);
  }
}

function addComparePoint() {
  const lat = Number($("#comparePointLat").value);
  const lonInput = Number($("#comparePointLon").value);
  if (!Number.isFinite(lat) || lat < -90 || lat > -75 || !Number.isFinite(lonInput) || lonInput < 0 || lonInput > 360) {
    setStatus($("#compareStatus"), t("comparePointRange"), "error");
    return;
  }
  const lon = lonInput === 360 ? 0 : lonInput;
  const point = { id: `candidate-${state.nextComparePoint}`, lat, lon };
  if ([...Object.values(sites), ...state.comparePoints].some((site) => siteKey(site) === siteKey(point))) {
    setStatus($("#compareStatus"), t("compareDuplicatePoint"), "error");
    return;
  }
  const suppliedName = $("#comparePointName").value.trim();
  const name = suppliedName || `${t("comparePointDefaultName")} ${state.nextComparePoint}`;
  point.nameAz = name; point.nameEn = name; point.source = "USER INPUT";
  state.nextComparePoint += 1;
  state.comparePoints.push(point);
  renderCustomComparePoints(); clearComparisonResults();
  $("#comparePointName").value = "";
  setStatus($("#compareStatus"), "");
}

function resetTerrainFacts() {
  for (const selector of ["#lolaElevation", "#lolaSlope", "#avgSunVisibility", "#avgEarthVisibility", "#nearestPsr"]) $(selector).textContent = "—";
  $("#psrNoteText").textContent = t("psrNote");
  $("#terrainStatus").textContent = t("terrainWaiting");
  $("#terrainModelBadge").textContent = t("terrainBadgeWaiting");
  state.siteAnalysis = null;
  updatePsrRoute(null);
}

function updatePsrRoute(analysis) {
  const target = analysis?.nearestPsr;
  if (!target) {
    if (state.map && state.psrTargetMarker) state.map.removeLayer(state.psrTargetMarker);
    if (state.map && state.psrRouteLine) state.map.removeLayer(state.psrRouteLine);
    state.psrTargetMarker = null; state.psrRouteLine = null;
    if (document.querySelector("#psrRouteDistance")) {
      $("#psrRouteDistance").textContent = analysis ? t("psrRouteNone") : t("psrRouteWaiting");
      $("#psrRouteCoordinates").textContent = "";
    }
    return;
  }
  $("#psrRouteDistance").textContent = `${target.distanceKm.toFixed(2)} km`;
  $("#psrRouteCoordinates").textContent = `${formatLat(target.lat)} · ${formatLon(target.lon)}`;
  if (!state.map) return;
  const start = lunarProject(getCurrentSite().lat, getCurrentSite().lon);
  const end = lunarProject(target.lat, target.lon);
  const points = [[start.y, start.x], [end.y, end.x]];
  if (state.psrRouteLine) state.map.removeLayer(state.psrRouteLine);
  if (state.psrTargetMarker) state.map.removeLayer(state.psrTargetMarker);
  state.psrRouteLine = L.polyline(points, { color: "#37dcff", weight: 2.5, opacity: 0.94, dashArray: "6 7", interactive: false }).addTo(state.map);
  state.psrTargetMarker = L.circleMarker([end.y, end.x], { radius: 7, color: "#d7f7ff", weight: 2, fillColor: "#39cfff", fillOpacity: 0.95 }).addTo(state.map).bindTooltip(t("psrTargetTooltip"));
}

function renderTerrainFailure(error, site) {
  console.warn("NASA LOLA site analysis unavailable; using geometric-horizon fallback.", error);
  if (site && siteKey(site) !== siteKey(getCurrentSite())) return;
  $("#terrainStatus").textContent = t("terrainFallback");
  $("#terrainModelBadge").textContent = t("terrainBadgeGeometric");
  $("#nearestPsr").textContent = t("terrainUnavailableShort");
  $("#psrNoteText").textContent = t("psrUnavailableNote");
  state.siteAnalysis = null;
  updatePsrRoute(null);
  $("#psrRouteDistance").textContent = t("terrainUnavailableShort");
}

function renderSiteAnalysis(analysis) {
  if (!analysis) return;
  const site = analysis.site;
  $("#lolaElevation").textContent = site.elevationM == null ? "—" : `${site.elevationM.toLocaleString()} m`;
  $("#lolaSlope").textContent = site.slopeP90Deg == null ? "—" : `${site.slopeP90Deg.toFixed(1)}° · P50 ${site.slopeMedianDeg.toFixed(1)}°`;
  $("#avgSunVisibility").textContent = analysis.illumination.averageSunVisibilityPct == null ? "—" : `${analysis.illumination.averageSunVisibilityPct.toFixed(1)}%`;
  $("#avgEarthVisibility").textContent = analysis.illumination.averageEarthVisibilityPct == null ? "—" : `${analysis.illumination.averageEarthVisibilityPct.toFixed(1)}%`;
  $("#nearestPsr").textContent = analysis.nearestPsr ? `${analysis.nearestPsr.distanceKm.toFixed(2)} km` : `>${analysis.psrSearchRadiusKm} km`;
  if (analysis.nearestPsr) {
    const point = analysis.nearestPsr;
    const latText = `${Math.abs(point.lat).toFixed(3)}°${point.lat < 0 ? "S" : "N"}`;
    const lonText = `${((point.lon % 360 + 360) % 360).toFixed(3)}°E`;
    $("#psrNoteText").textContent = `${t("nearestPsrLabel")}: ${point.distanceKm.toFixed(2)} km · ${latText}, ${lonText}. 120 m NASA LOLA pixel; 20 km search radius.`;
  } else {
    $("#psrNoteText").textContent = `No mapped PSR pixel within ${analysis.psrSearchRadiusKm} km.`;
  }
  const resolution = analysis.site.resolutionM || analysis.horizon?.sourceResolutionM || 120;
  $("#terrainStatus").textContent = t("terrainReady").replace("{resolution}", resolution).replace("{radius}", analysis.horizon?.maxRadiusKm ?? 0);
  $("#terrainModelBadge").textContent = analysis.horizon ? t("terrainBadgeReady") : t("terrainBadgeGeometric");
  state.siteAnalysis = analysis;
  updatePsrRoute(analysis);
}

async function ensureSiteAnalysis(site = getCurrentSite()) {
  const key = siteKey(site);
  if (state.analysisCache.has(key)) {
    const cached = state.analysisCache.get(key);
    if (key === siteKey(getCurrentSite())) renderSiteAnalysis(cached);
    return cached;
  }
  if (state.analysisRequests.has(key)) return state.analysisRequests.get(key);
  if (key === siteKey(getCurrentSite())) $("#terrainStatus").textContent = t("terrainLoading");
  const request = (async () => {
    const query = new URLSearchParams({ lat: String(site.lat), lon: String(site.lon) });
    const response = await fetch(`/api/lola/site?${query}`, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(120_000) });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.message || t("terrainFallback"));
    state.analysisCache.set(key, payload);
    if (key === siteKey(getCurrentSite())) renderSiteAnalysis(payload);
    return payload;
  })().catch((error) => {
    if (key === siteKey(getCurrentSite())) renderTerrainFailure(error, site);
    throw error;
  }).finally(() => state.analysisRequests.delete(key));
  state.analysisRequests.set(key, request);
  return request;
}

function refreshSite() {
  const site = getCurrentSite();
  $("#latDisplay").textContent = formatLat(site.lat);
  $("#lonDisplay").textContent = formatLon(site.lon);
  $("#coordSource").textContent = site.source;
  $("#mapCoordinate").textContent = `${formatLat(site.lat)} · ${formatLon(site.lon)}`;
  const isShackleton = site.id === "shackleton";
  const isCustom = site.id === "custom";
  $("#mapTitle").textContent = isCustom
    ? (state.language === "az" ? "Seçilmiş lunar koordinat" : "Selected lunar coordinate")
    : isShackleton
      ? (state.language === "az" ? "Shackleton · krater ərazisi" : "Shackleton · crater region")
      : site.id === "landingA" ? t("landingPopupTitle")
        : (state.language === "az" ? "Mons Mouton · cənub qütbü" : "Mons Mouton · lunar south pole");
  $("#factsTitle").textContent = isCustom
    ? (state.language === "az" ? "Xüsusi nöqtə" : "Custom point")
    : isShackleton ? "Shackleton" : "Mons Mouton";
  const monsFeature = site.id === "team" || site.id === "landingA" || site.id === "center";
  $("#featureDiameter").textContent = monsFeature ? "130 km" : "—";
  const featureLink = $("#featureSourceLink");
  featureLink.classList.toggle("is-hidden", site.id === "custom");
  featureLink.href = isShackleton ? "https://planetarynames.wr.usgs.gov/Feature/5450" : "https://planetarynames.wr.usgs.gov/Feature/16070";
  featureLink.textContent = isShackleton ? (state.language === "az" ? "USGS · Shackleton qeydi ↗" : "USGS · Shackleton record ↗") : t("featureSource");
  $("#observerHeight").textContent = `${Number(site.altKm ?? 0).toFixed(1)} km*`;
  if (state.marker) {
    state.marker.options.title = site.id === "landingA" ? t("landingPopupTitle") : siteName(site);
    state.marker.setPopupContent(createSitePopup(site));
  }
  moveMarker(site.lat, site.lon);
  const cached = state.analysisCache.get(siteKey(site));
  if (cached) renderSiteAnalysis(cached);
}

function lunarProject(lat, lon) {
  const phi = lat * Math.PI / 180;
  const lambda = lon * Math.PI / 180;
  const rho = 2 * MOON_RADIUS_KM * 1000 * Math.tan(Math.PI / 4 + phi / 2);
  return { x: rho * Math.sin(lambda), y: rho * Math.cos(lambda) };
}

function lunarUnproject(x, y) {
  const rho = Math.hypot(x, y);
  const lat = (2 * (Math.atan(rho / (2 * MOON_RADIUS_KM * 1000)) - Math.PI / 4)) * 180 / Math.PI;
  const lon = ((Math.atan2(x, y) * 180 / Math.PI) % 360 + 360) % 360;
  return { lat, lon };
}

function initializeMap() {
  if (!window.L) {
    setMapStatus(t("mapError"), false, true);
    return;
  }
  const moonCrs = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(1, TILE_ORIGIN, -1, TILE_ORIGIN),
    scale: (zoom) => Math.pow(2, zoom) / TILE_RESOLUTION_0,
    zoom: (scale) => Math.log(scale * TILE_RESOLUTION_0) / Math.LN2,
  });
  state.map = L.map("moonMap", { crs: moonCrs, minZoom: 0, maxZoom: 8, zoomSnap: 1, zoomDelta: 1, attributionControl: false, zoomControl: true, scrollWheelZoom: true, worldCopyJump: false, maxBoundsViscosity: 0.75 });
  const center = lunarProject(getCurrentSite().lat, getCurrentSite().lon);
  state.map.setView([center.y, center.x], 6);
  const layer = L.tileLayer(NASA_LOLA_TILES, { minZoom: 0, maxZoom: 8, tileSize: 256, noWrap: true, keepBuffer: 2, className: "moon-tile", crossOrigin: false, bounds: [[-457440, -457440], [457440, 457440]] });
  layer.on("tileload", () => { state.mapReady = true; setMapStatus(t("mapReady"), true); });
  layer.on("tileerror", () => { if (!state.mapReady) setMapStatus(t("mapError"), false, true); });
  layer.addTo(state.map);
  state.psrLayer = L.imageOverlay(NASA_PSR_OVERLAY, [[-457440, -457440], [457440, 457440]], { opacity: 0.95, pane: "overlayPane", alt: "NASA LOLA 120 m permanent-shadow regions" });
  if (state.psrVisible) state.psrLayer.addTo(state.map);
  state.scoutLayer = L.layerGroup().addTo(state.map);
  state.marker = L.marker([center.y, center.x], { icon: L.divIcon({ className: "site-marker-wrap", html: '<span class="site-marker-pin"></span>', iconSize: [24, 24], iconAnchor: [12, 12] }), keyboard: true, title: "Selected lunar landing coordinate" }).addTo(state.map);
  state.marker.bindPopup(createSitePopup(getCurrentSite()), { className: "site-info-popup", offset: [0, -8], maxWidth: 280 });
  state.map.on("click", (event) => {
    const point = lunarUnproject(event.latlng.lng, event.latlng.lat);
    if (point.lat > -75 || point.lat < -90) return;
    sites.custom.lat = Math.max(-89.99, point.lat);
    sites.custom.lon = point.lon;
    state.currentSite = "custom";
    $("#siteSelect").value = "custom";
    clearScoutGrid();
    state.lastData = null;
    clearMissionData();
    resetTerrainFacts();
    refreshSite();
    setStatus($("#requestStatus"), t("customSite"));
    ensureSiteAnalysis(getCurrentSite()).catch(() => null);
  });
  setTimeout(() => state.map?.invalidateSize(), 100);
}

function setMapStatus(message, loaded = false, failed = false) {
  const element = $("#mapStatus");
  element.classList.toggle("is-loaded", loaded);
  element.classList.toggle("is-error", failed);
  element.querySelector("span").textContent = message;
}

function updatePsrToggle() {
  const button = $("#psrToggle");
  if (!button) return;
  button.textContent = state.psrVisible ? t("psrOn") : t("psrOff");
  button.setAttribute("aria-pressed", String(state.psrVisible));
}

function togglePsrLayer() {
  state.psrVisible = !state.psrVisible;
  if (state.psrLayer) {
    if (state.psrVisible) state.psrLayer.addTo(state.map);
    else state.map.removeLayer(state.psrLayer);
  }
  updatePsrToggle();
}

function moveMarker(lat, lon) {
  if (!state.map || !state.marker) return;
  const point = lunarProject(lat, lon);
  state.marker.setLatLng([point.y, point.x]);
}

function centerMap() {
  if (!state.map) return;
  const point = lunarProject(getCurrentSite().lat, getCurrentSite().lon);
  state.map.setView([point.y, point.x], Math.max(6, state.map.getZoom()), { animate: true });
}

function focusPsrRoute() {
  if (!state.map || !state.psrTargetMarker || !state.psrRouteLine) {
    setStatus($("#requestStatus"), t("psrRouteWaiting"));
    return;
  }
  state.map.fitBounds(state.psrRouteLine.getLatLngs(), { padding: [42, 42], maxZoom: 7, animate: true });
  state.psrTargetMarker.openTooltip();
}

function clearScoutGrid() {
  if (state.scoutLayer) state.scoutLayer.clearLayers();
  state.scoutData = null;
  $("#scoutCount").textContent = "";
  $("#scoutRange").textContent = t("scoutNote");
}

function renderScoutGrid() {
  if (!state.scoutData || !state.scoutLayer) return;
  state.scoutLayer.clearLayers();
  const mode = $("#scoutMetric").value;
  const key = mode === "sun" ? "sunAveragePct" : mode === "earth" ? "earthAveragePct" : "slopeDeg";
  const validValues = state.scoutData.cells.map((cell) => cell[key]).filter((value) => Number.isFinite(value));
  if (!validValues.length) return;
  const min = Math.min(...validValues); const max = Math.max(...validValues); const colors = ["#d16a58", "#dc9a57", "#d2c36c", "#78c797", "#42b5c8"];
  const valueLabel = mode === "slope" ? "°" : "%";
  $("#scoutRange").textContent = `${mode === "sun" ? t("scoutSun") : mode === "earth" ? t("scoutEarth") : t("scoutSlope")}: ${min.toFixed(1)}–${max.toFixed(1)}${valueLabel} · local relative scale`;
  const width = state.scoutData.gridSpacingKm * 1000 * 0.86; const half = width / 2;
  for (const cell of state.scoutData.cells) {
    const value = cell[key];
    if (!Number.isFinite(value)) continue;
    let fraction = max === min ? 0.5 : (value - min) / (max - min);
    if (mode === "slope") fraction = 1 - fraction;
    const color = colors[Math.max(0, Math.min(colors.length - 1, Math.round(fraction * (colors.length - 1))))];
    const tooltip = `${formatLat(cell.lat)} · ${formatLon(cell.lon)}<br/>☼ ${cell.sunAveragePct}% · Earth ${cell.earthAveragePct}% · slope ${cell.slopeDeg}° · elevation ${cell.elevationM ?? "—"} m${cell.permanentShadow ? " · PSR" : ""}`;
    const rectangle = L.rectangle([[cell.y - half, cell.x - half], [cell.y + half, cell.x + half]], {
      color: cell.permanentShadow ? "#a6e8ff" : color, weight: cell.permanentShadow ? 1.2 : 0.6,
      opacity: 0.78, fillColor: color, fillOpacity: 0.35, bubblingMouseEvents: false,
    }).addTo(state.scoutLayer);
    rectangle.bindTooltip(tooltip, { sticky: true, direction: "top" });
    rectangle.on("click", () => selectScoutedCell(cell));
  }
}

async function scanCandidateArea() {
  if (state.scoutBusy) return;
  const button = $("#scoutButton");
  state.scoutBusy = true; button.disabled = true; button.textContent = t("scoutLoading");
  $("#scoutStatus").textContent = t("scoutLoading");
  const site = getCurrentSite();
  const query = new URLSearchParams({ lat: String(site.lat), lon: String(site.lon), radiusKm: $("#scoutRadius").value, spacingKm: $("#scoutStep").value });
  try {
    const response = await fetch(`/api/lola/scout?${query}`, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(120_000) });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.message || t("terrainFallback"));
    state.scoutData = payload; renderScoutGrid();
    $("#scoutCount").textContent = `${payload.sampleCount} cells`;
    $("#scoutStatus").textContent = t("scoutDone").replace("{n}", payload.sampleCount);
  } catch (error) {
    $("#scoutStatus").textContent = t("scoutError").replace("{error}", error.message || "error");
  } finally {
    state.scoutBusy = false; button.disabled = false; button.textContent = t("scoutButton");
  }
}

function selectScoutedCell(cell) {
  sites.custom.lat = cell.lat; sites.custom.lon = cell.lon;
  state.currentSite = "custom"; $("#siteSelect").value = "custom";
  state.lastData = null; clearMissionData(); resetTerrainFacts(); refreshSite();
  setStatus($("#requestStatus"), t("customSite"));
  runMission();
}

function switchView(name, scrollToTop = true) {
  $$(".view-tab").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.view === name));
  $$(".view-panel").forEach((panel) => panel.classList.toggle("is-visible", panel.dataset.panel === name));
  if (name === "mission") setTimeout(() => state.map?.invalidateSize(), 60);
  if (scrollToTop) window.scrollTo({ top: 0, behavior: "smooth" });
}

function openRoadmap() {
  switchView("sources", false);
  const roadmap = $("#futureRoadmap");
  roadmap.open = true;
  requestAnimationFrame(() => roadmap.scrollIntoView({ behavior: "smooth", block: "start" }));
}

function getDateWindow(startValue, days) {
  if (!startValue) throw new Error(t("chooseDate"));
  const start = new Date(`${startValue}T00:00:00Z`);
  if (!Number.isFinite(start.getTime())) throw new Error(t("chooseDate"));
  const stop = new Date(start.getTime() + Number(days) * DAY_MS);
  return { start: startValue, stop: stop.toISOString().slice(0, 10) };
}

function makeHorizonsUrl(target, site, start, stop, stepSize = "1 h") {
  const query = new URLSearchParams({
    format: "json", COMMAND: `'${target}'`, OBJ_DATA: "'NO'", MAKE_EPHEM: "'YES'", EPHEM_TYPE: "'OBSERVER'",
    CENTER: "'coord@301'", COORD_TYPE: "'GEODETIC'", SITE_COORD: `'${site.lon},${site.lat},${Number(site.altKm ?? 0)}'`,
    START_TIME: `'${start} 00:00'`, STOP_TIME: `'${stop} 00:00'`, STEP_SIZE: `'${stepSize}'`, TIME_TYPE: "'UT'", QUANTITIES: "'4'", CSV_FORMAT: "'YES'",
  });
  return `${HORIZONS_PROXY}?${query.toString()}`;
}

function parseCSVRows(text) {
  return text.split(/\r?\n/).map((line) => {
    const fields = [];
    let field = "";
    let quoted = false;
    for (let index = 0; index < line.length; index += 1) {
      const char = line[index];
      if (char === '"') {
        if (quoted && line[index + 1] === '"') { field += '"'; index += 1; }
        else quoted = !quoted;
      } else if (char === "," && !quoted) { fields.push(field.trim()); field = ""; }
      else field += char;
    }
    fields.push(field.trim());
    return fields;
  });
}

function parseHorizons(response) {
  if (response.error) throw new Error(response.error);
  const result = response.result || "";
  const start = result.indexOf("$$SOE");
  const end = result.indexOf("$$EOE");
  if (start < 0 || end <= start) throw new Error(t("noRows"));
  const monthIndex = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const samples = [];
  for (const row of parseCSVRows(result.slice(start + 5, end))) {
    const timeText = row[0];
    const dateParts = timeText?.match(/^(\d{4})-([A-Za-z]{3})-(\d{2})\s+(\d{2}):(\d{2})(?::([\d.]+))?/);
    if (!dateParts || monthIndex[dateParts[2]] === undefined) continue;
    const date = new Date(Date.UTC(Number(dateParts[1]), monthIndex[dateParts[2]], Number(dateParts[3]), Number(dateParts[4]), Number(dateParts[5]), Math.floor(Number(dateParts[6] || 0))));
    const values = row.slice(1).map((value) => {
      const match = value.replace(/[°]/g, "").match(/[+-]?(?:\d+\.?\d*|\.\d+)/);
      return match ? Number(match[0]) : NaN;
    }).filter(Number.isFinite);
    if (!Number.isFinite(date.getTime()) || values.length < 2) continue;
    // Horizons quantity 4 returns azimuth then elevation; elevation is the final numeric field.
    samples.push({ time: date.getTime(), azimuth: values[0], elevation: values.at(-1) });
  }
  samples.sort((a, b) => a.time - b.time);
  if (samples.length < 2) throw new Error(t("noRows"));
  return samples;
}

async function fetchEphemeris(target, site, start, stop, stepSize = "1 h") {
  if (window.location.protocol === "file:") throw new Error(t("fileError"));
  const response = await fetch(makeHorizonsUrl(target, site, start, stop, stepSize), { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(90_000) });
  let payload;
  try { payload = await response.json(); } catch { throw new Error(t("apiError")); }
  if (!response.ok) throw new Error(payload.message || t("apiError"));
  return parseHorizons(payload);
}

function integratePositive(samples, valueFn = (sample) => sample.elevation) {
  let totalHours = 0;
  for (let index = 0; index < samples.length - 1; index += 1) {
    const aSample = samples[index]; const bSample = samples[index + 1];
    const hours = Math.max(0, (bSample.time - aSample.time) / 3_600_000);
    const a = valueFn(aSample); const b = valueFn(bSample);
    if (a > 0 && b > 0) totalHours += hours;
    else if (a < 0 && b > 0) totalHours += hours * b / (b - a);
    else if (a > 0 && b < 0) totalHours += hours * a / (a - b);
  }
  return totalHours;
}

function skylineElevation(analysis, azimuth) {
  const profile = analysis?.horizon;
  if (!profile?.valuesDeg?.length) return 0;
  const step = profile.stepDeg || 1;
  const coordinate = ((Number(azimuth || 0) % 360) + 360) % 360 / step;
  const lower = Math.floor(coordinate) % profile.valuesDeg.length;
  const upper = (lower + 1) % profile.valuesDeg.length;
  const fraction = coordinate - Math.floor(coordinate);
  return profile.valuesDeg[lower] * (1 - fraction) + profile.valuesDeg[upper] * fraction;
}

function visibleDiscFraction(clearance, radius) {
  const position = clearance / radius;
  if (position >= 1) return 1;
  if (position <= -1) return 0;
  return (Math.acos(-position) + position * Math.sqrt(1 - position * position)) / Math.PI;
}

function applyTerrain(samples, analysis, body) {
  const radius = body === "sun" ? SUN_ANGULAR_RADIUS_DEG : EARTH_ANGULAR_RADIUS_DEG;
  return samples.map((sample) => {
    const skyline = skylineElevation(analysis, sample.azimuth);
    const clearance = sample.elevation - skyline;
    return {
      ...sample,
      skylineElevation: skyline,
      terrainClearance: clearance,
      visibilityElevation: clearance + radius,
      visibleDiscFraction: visibleDiscFraction(clearance, radius),
    };
  });
}

function integratePanelEnergy(samples, area, efficiency) {
  let wattHours = 0;
  for (let index = 0; index < samples.length - 1; index += 1) {
    const first = samples[index]; const second = samples[index + 1];
    const span = Math.max(0, (second.time - first.time) / 3_600_000);
    const firstSun = Math.max(0, Math.sin(first.elevation * Math.PI / 180)) * first.visibleDiscFraction;
    const secondSun = Math.max(0, Math.sin(second.elevation * Math.PI / 180)) * second.visibleDiscFraction;
    wattHours += SOLAR_CONSTANT * area * (efficiency / 100) * (firstSun + secondSun) / 2 * span;
  }
  return wattHours / 1000;
}

function simulateEnergyBudget(sun, area, efficiency, days, loadW, batteryCapacityWh) {
  const hours = days * 24;
  const demandWh = loadW * hours;
  let batteryWh = batteryCapacityWh;
  let minimumBatteryWh = batteryWh;
  let producedWh = 0;
  let accumulatedUnpoweredHours = 0;
  let currentUnpoweredHours = 0;
  let longestUnpoweredHours = 0;
  const solarWatts = (sample) => SOLAR_CONSTANT * area * (efficiency / 100) * Math.max(0, Math.sin(sample.elevation * Math.PI / 180)) * (sample.visibleDiscFraction ?? (sample.elevation > 0 ? 1 : 0));
  for (let index = 0; index < sun.length - 1; index += 1) {
    const first = sun[index]; const second = sun[index + 1];
    const span = Math.max(0, (second.time - first.time) / 3_600_000);
    const harvestWh = (solarWatts(first) + solarWatts(second)) / 2 * span;
    const intervalDemandWh = loadW * span;
    producedWh += harvestWh;
    const netWh = harvestWh - intervalDemandWh;
    if (netWh >= 0) {
      batteryWh = Math.min(batteryCapacityWh, batteryWh + netWh);
      currentUnpoweredHours = 0;
    } else {
      const deficitWh = -netWh;
      const unmetWh = Math.max(0, deficitWh - batteryWh);
      batteryWh = Math.max(0, batteryWh - deficitWh);
      const unpowered = loadW > 0 ? Math.min(span, unmetWh / loadW) : 0;
      if (unpowered > 0) {
        accumulatedUnpoweredHours += unpowered;
        currentUnpoweredHours += unpowered;
        longestUnpoweredHours = Math.max(longestUnpoweredHours, currentUnpoweredHours);
      } else currentUnpoweredHours = 0;
    }
    minimumBatteryWh = Math.min(minimumBatteryWh, batteryWh);
  }
  return {
    loadEnergyKwh: demandWh / 1000,
    netEnergyKwh: (producedWh - demandWh) / 1000,
    batteryMinimumPct: batteryCapacityWh > 0 ? minimumBatteryWh / batteryCapacityWh * 100 : null,
    batteryEndPct: batteryCapacityWh > 0 ? batteryWh / batteryCapacityWh * 100 : null,
    unpoweredHours: accumulatedUnpoweredHours,
    longestUnpoweredHours,
    batteryCapacityWh,
    averageLoadW: loadW,
  };
}

function summarizeSeries(sunSamples, earthSamples, start, days, area, efficiency, analysis = null, profile = {}) {
  const sun = applyTerrain(sunSamples, analysis, "sun");
  const earth = applyTerrain(earthSamples, analysis, "earth");
  const assumedProfile = { loadW: Number(profile.loadW ?? 80), batteryCapacityWh: Number(profile.batteryCapacityWh ?? 2000), earthMarginDeg: Number(profile.earthMarginDeg ?? 5) };
  const earthByTime = new Map(earth.map((sample) => [sample.time, sample.visibilityElevation]));
  const paired = sun.filter((sample) => earthByTime.has(sample.time)).map((sample) => ({ time: sample.time, visibility: sample.visibilityElevation, earth: earthByTime.get(sample.time) }));
  return {
    sun, earth, analysis,
    sunlightHours: integratePositive(sun, (sample) => sample.visibilityElevation),
    earthHours: integratePositive(earth, (sample) => sample.visibilityElevation),
    radioClearanceHours: integratePositive(earth, (sample) => sample.terrainClearance - assumedProfile.earthMarginDeg),
    overlapHours: integratePositive(paired, (sample) => Math.min(sample.visibility, sample.earth)),
    geometricSunlightHours: integratePositive(sunSamples),
    geometricEarthHours: integratePositive(earthSamples),
    totalHours: days * 24,
    energyKwh: integratePanelEnergy(sun, area, efficiency),
    energyBudget: simulateEnergyBudget(sun, area, efficiency, days, assumedProfile.loadW, assumedProfile.batteryCapacityWh),
    profile: assumedProfile, start, days, area, efficiency,
  };
}

function balancedIndex(result) {
  const idealEnergyKwh = SOLAR_CONSTANT * result.area * (result.efficiency / 100) * result.totalHours / 1000;
  const energyShare = idealEnergyKwh > 0 ? Math.min(1, result.energyKwh / idealEnergyKwh) : 0;
  const earthShare = result.totalHours > 0 ? Math.min(1, result.radioClearanceHours / result.totalHours) : 0;
  return 50 * energyShare + 50 * earthShare;
}

function fmtHours(hours) { return `${hours.toFixed(hours >= 100 ? 0 : 1)} h`; }
function percentage(value, total) { return Math.max(0, Math.min(100, (value / total) * 100)); }
function setStatus(element, message, kind = "") { element.textContent = message; element.className = `request-status${kind ? ` is-${kind}` : ""}`; }

function setDataStatus(status) {
  state.dataStatus = status;
  const badge = $("#liveBadge");
  badge.classList.toggle("is-pending", status === "checking");
  badge.classList.toggle("is-offline", status === "offline");
  $("#liveBadgeText").textContent = t(status);
}

function validatePanel() {
  const area = Number($("#panelArea").value);
  const efficiency = Number($("#panelEfficiency").value);
  const loadW = Number($("#averageLoadW").value);
  const batteryCapacityWh = Number($("#batteryCapacityWh").value);
  const earthMarginDeg = Number($("#earthMarginDeg").value);
  if (!Number.isFinite(area) || area < 0.1 || area > 100 || !Number.isFinite(efficiency) || efficiency < 1 || efficiency > 50 || !Number.isFinite(loadW) || loadW < 0 || loadW > 10000 || !Number.isFinite(batteryCapacityWh) || batteryCapacityWh < 0 || batteryCapacityWh > 100000 || !Number.isFinite(earthMarginDeg) || earthMarginDeg < 0 || earthMarginDeg > 30) throw new Error(t("rangeError"));
  return { area, efficiency, loadW, batteryCapacityWh, earthMarginDeg };
}

function renderMissionData(data) {
  $("#sunMetric").textContent = fmtHours(data.sunlightHours);
  $("#sunMetricUnit").textContent = `${percentage(data.sunlightHours, data.totalHours).toFixed(1)}%`;
  $("#earthMetric").textContent = fmtHours(data.earthHours);
  $("#earthMetricUnit").textContent = `${percentage(data.earthHours, data.totalHours).toFixed(1)}%`;
  $("#energyMetric").textContent = data.energyKwh.toFixed(data.energyKwh < 10 ? 2 : 1);
  $("#energyMetricUnit").textContent = `kWh · ${$("#panelArea").value} m²`;
  $("#sunProgress").style.width = `${percentage(data.sunlightHours, data.totalHours)}%`;
  $("#earthProgress").style.width = `${percentage(data.earthHours, data.totalHours)}%`;
  $("#sunCaption").textContent = t("sunCaption").replace("{days}", data.days);
  $("#earthCaption").textContent = t("earthCaption").replace("{hours}", fmtHours(data.earthHours)) + ` · ${t("overlapCaption").replace("{hours}", fmtHours(data.overlapHours))}`;
  $("#energyCaption").textContent = t("energyCaption").replace("{area}", $("#panelArea").value).replace("{eff}", $("#panelEfficiency").value).replace("{days}", data.days);
  const budget = data.energyBudget;
  $("#loadEnergyMetric").textContent = `${budget.loadEnergyKwh.toFixed(budget.loadEnergyKwh < 10 ? 2 : 1)} kWh`;
  $("#loadEnergyNote").textContent = t("loadEnergyNote").replace("{w}", budget.averageLoadW).replace("{days}", data.days);
  $("#netEnergyMetric").textContent = `${budget.netEnergyKwh >= 0 ? "+" : ""}${budget.netEnergyKwh.toFixed(2)} kWh`;
  $("#netEnergyMetric").classList.toggle("is-negative", budget.netEnergyKwh < 0);
  $("#netEnergyMetric").classList.toggle("is-positive", budget.netEnergyKwh >= 0);
  $("#netEnergyNote").textContent = t(budget.netEnergyKwh >= 0 ? "energyNetPositive" : "energyNetNegative");
  $("#batteryOutageMetric").textContent = budget.batteryCapacityWh <= 0 ? "—" : budget.unpoweredHours > 0.05 ? `${budget.unpoweredHours.toFixed(1)} h` : `${budget.batteryMinimumPct.toFixed(0)}% min`;
  $("#batteryReserveNote").textContent = budget.batteryCapacityWh <= 0 ? t("batteryDisabled") : budget.unpoweredHours > 0.05
    ? t("batteryOutage").replace("{hours}", budget.unpoweredHours.toFixed(1))
    : `${t("batteryNoOutage")} · ${t("batteryReserveEnd").replace("{pct}", budget.batteryEndPct.toFixed(0))}`;
  $("#linkHoursMetric").textContent = `${fmtHours(data.radioClearanceHours)} · ${percentage(data.radioClearanceHours, data.totalHours).toFixed(1)}%`;
  $("#linkHoursNote").textContent = t("linkHoursText").replace("{margin}", data.profile.earthMarginDeg);
  $("#exportMission").disabled = false;
  $("#scoreNote").textContent = t("windowScoreNote").replace("{margin}", data.profile.earthMarginDeg);
  $("#chartSource").textContent = data.analysis
    ? `NASA/JPL Horizons · NASA LOLA ${data.analysis.site.resolutionM} m · UTC`
    : `${t("chartSource")} · ${t("terrainBadgeGeometric")}`;
  if (data.analysis?.horizon) $("#terrainModelBadge").textContent = t("terrainBadgeReady");
  else $("#terrainModelBadge").textContent = t("terrainBadgeGeometric");
  const noSun = data.sunlightHours < 0.01;
  const noEarth = data.earthHours < 0.01;
  const isMappedPsr = data.analysis?.illumination?.permanentShadowAtPoint === true;
  const condition = $("#siteCondition");
  if (noSun || noEarth) {
    $("#siteConditionTitle").textContent = isMappedPsr && noSun ? t("psrAlertTitle") : t("visibilityAlertTitle");
    const notes = [];
    if (isMappedPsr && noSun) notes.push(t("psrAlertCopy"));
    else if (noSun) notes.push(t("visibilityAlertSun"));
    if (noEarth) notes.push(t("visibilityAlertEarth"));
    $("#siteConditionCopy").textContent = notes.join(" ");
    condition.classList.remove("is-hidden");
  } else {
    condition.classList.add("is-hidden");
  }
  drawElevationChart(data.sun, data.earth);
  renderTimeline(data);
}

function clearMissionData() {
  $("#sunMetric").textContent = "—"; $("#earthMetric").textContent = "—"; $("#energyMetric").textContent = "—";
  $("#sunMetricUnit").textContent = "h"; $("#earthMetricUnit").textContent = "h"; $("#energyMetricUnit").textContent = "kWh";
  $("#sunProgress").style.width = "0%"; $("#earthProgress").style.width = "0%";
  $("#sunCaption").textContent = t("metricEmpty"); $("#earthCaption").textContent = t("metricEmpty"); $("#energyCaption").textContent = t("energyEmpty");
  $("#elevationChart").innerHTML = "";
  $("#windowTimeline").innerHTML = `<p>${t("timelineEmpty")}</p>`;
  for (const selector of ["#loadEnergyMetric", "#netEnergyMetric", "#batteryOutageMetric", "#linkHoursMetric"]) $(selector).textContent = "—";
  $("#loadEnergyNote").textContent = "—"; $("#batteryReserveNote").textContent = "—"; $("#linkHoursNote").textContent = "—";
  $("#netEnergyMetric").classList.remove("is-negative", "is-positive"); $("#exportMission").disabled = true;
  $("#siteCondition").classList.add("is-hidden");
  $("#bestWindowResults").innerHTML = ""; $("#bestWindowResults").classList.add("is-hidden"); state.bestWindows = null;
}

function exportMissionReport() {
  const data = state.lastData;
  if (!data) { setStatus($("#requestStatus"), t("exportMissing"), "error"); return; }
  const site = getCurrentSite();
  const earthByTime = new Map(data.earth.map((sample) => [sample.time, sample]));
  const rows = data.sun.map((sun) => {
    const earth = earthByTime.get(sun.time);
    return {
      utc: new Date(sun.time).toISOString(),
      sunAzimuthDeg: Number(sun.azimuth.toFixed(3)), sunElevationDeg: Number(sun.elevation.toFixed(3)),
      sunTerrainClearanceDeg: Number((sun.terrainClearance ?? sun.elevation).toFixed(3)), sunDiscVisibleFraction: Number((sun.visibleDiscFraction ?? 0).toFixed(4)),
      earthAzimuthDeg: earth ? Number(earth.azimuth.toFixed(3)) : null, earthElevationDeg: earth ? Number(earth.elevation.toFixed(3)) : null,
      earthTerrainClearanceDeg: earth ? Number((earth.terrainClearance ?? earth.elevation).toFixed(3)) : null,
      earthDiscVisibleFraction: earth ? Number((earth.visibleDiscFraction ?? 0).toFixed(4)) : null,
    };
  });
  const report = {
    project: "TexnoLead Lunar Landing Site Navigator", createdUTC: new Date().toISOString(),
    site: { name: site.nameEn, latitudeDeg: site.lat, eastLongitudeDeg: site.lon, observerAltitudeKm: Number(site.altKm ?? 0), reference: site.source },
    intervalUTC: { start: data.start, days: data.days, endExclusive: new Date(new Date(`${data.start}T00:00:00Z`).getTime() + data.days * DAY_MS).toISOString() },
    sources: { ephemeris: "NASA/JPL Horizons API · Sun 10, Earth 399 · observer coord@301 · east-positive longitude, signed latitude, altitude km", terrain: data.analysis?.elevationSource || "geometric fallback", longTermIllumination: "NASA LOLA Product 69 · 18.6-year average" },
    terrain: data.analysis ? { site: data.analysis.site, nearestMappedPSR: data.analysis.nearestPsr, psrSearchRadiusKm: data.analysis.psrSearchRadiusKm, averageSunVisibilityPct: data.analysis.illumination.averageSunVisibilityPct, averageEarthVisibilityPct: data.analysis.illumination.averageEarthVisibilityPct, horizonSourceResolutionM: data.analysis.horizon?.sourceResolutionM, horizonMaxRadiusKm: data.analysis.horizon?.maxRadiusKm } : null,
    modelAssumptions: { panelAreaM2: data.area, panelEfficiencyPct: data.efficiency, panelOrientation: "horizontal", averageLoadW: data.profile.loadW, batteryCapacityWh: data.profile.batteryCapacityWh, batteryStartsFull: true, minimumEarthCenterClearanceDeg: data.profile.earthMarginDeg, stepHours: "1 hour for mission run; trapezoidal integration" },
    results: { sunlightHours: data.sunlightHours, earthDiscVisibleHours: data.earthHours, earthCenterMarginHours: data.radioClearanceHours, sunEarthOverlapHours: data.overlapHours, idealSolarEnergyKWh: data.energyKwh, loadEnergyKWh: data.energyBudget.loadEnergyKwh, netEnergyKWh: data.energyBudget.netEnergyKwh, batteryMinimumPct: data.energyBudget.batteryMinimumPct, batteryEndPct: data.energyBudget.batteryEndPct, unpoweredHours: data.energyBudget.unpoweredHours, longestUnpoweredHours: data.energyBudget.longestUnpoweredHours },
    limitations: ["Earth visibility or elevation margin is not a radio link budget or DSN schedule.", "The battery simulation assumes a full battery at the start and omits thermal, conversion, wiring, and hardware losses.", "Nearest PSR is the nearest mapped pixel, not a verified water-ice deposit or a traversable route.", "Slope and horizon are limited by the stated LOLA source resolution."],
    hourlyEphemerisAndClearance: rows,
  };
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob); const anchor = document.createElement("a");
  anchor.href = url; anchor.download = `TexnoLead_mission_${data.start}_${site.lat.toFixed(2)}_${site.lon.toFixed(2)}.json`;
  document.body.append(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url);
  setStatus($("#requestStatus"), t("exportReady"), "success");
}

function drawElevationChart(sun, earth) {
  const svg = $("#elevationChart");
  const width = 1000; const height = 280; const plot = { left: 58, right: 18, top: 14, bottom: 30, gap: 18 };
  const plotWidth = width - plot.left - plot.right;
  const panelHeight = (height - plot.top - plot.bottom - plot.gap) / 2;
  const sunTop = plot.top; const sunBottom = sunTop + panelHeight;
  const earthTop = sunBottom + plot.gap; const earthBottom = earthTop + panelHeight;
  const clearance = (sample) => sample.terrainClearance ?? sample.elevation;
  const xAt = (index, count) => plot.left + index / Math.max(1, count - 1) * plotWidth;
  const makeScale = (samples, top, bottom) => {
    const values = samples.map(clearance).filter(Number.isFinite);
    const dataMinimum = Math.min(0, ...values); let minimum = dataMinimum;
    let maximum = Math.max(0, ...values);
    const spread = Math.max(4, maximum - minimum);
    if (dataMinimum < 0) minimum -= spread * 0.08;
    maximum += spread * 0.13;
    const y = (value) => top + (maximum - value) / (maximum - minimum) * (bottom - top);
    const ticks = [maximum, (maximum + minimum) / 2, 0, minimum]
      .filter((value, index, all) => all.findIndex((candidate) => Math.abs(candidate - value) < 0.1) === index)
      .sort((a, b) => b - a);
    const grid = ticks.map((value) => {
      const label = Math.abs(value) < 0.5 ? "0" : value.toFixed(0);
      return `<line class="chart-grid-line ${Math.abs(value) < 0.05 ? "zero" : ""}" x1="${plot.left}" y1="${y(value)}" x2="${width - plot.right}" y2="${y(value)}"/><text class="chart-axis-label" x="${plot.left - 9}" y="${y(value) + 4}" text-anchor="end">${label}°</text>`;
    }).join("");
    return { y, grid };
  };
  const sunScale = makeScale(sun, sunTop, sunBottom);
  const earthScale = makeScale(earth, earthTop, earthBottom);
  const xTicks = [0, 0.25, 0.5, 0.75, 1].map((fraction) => {
    const x = plot.left + fraction * plotWidth; const index = Math.min(Math.round(fraction * (sun.length - 1)), Math.max(0, sun.length - 2));
    const date = new Date(sun[index]?.time || Date.now());
    const label = `${String(date.getUTCDate()).padStart(2, "0")} ${date.toLocaleString(state.language === "az" ? "az-AZ" : "en-US", { month: "short", timeZone: "UTC" })}`;
    return `<line class="chart-grid-line" x1="${x}" y1="${plot.top}" x2="${x}" y2="${height - plot.bottom}"/><text class="chart-axis-label" x="${x}" y="${height - 8}" text-anchor="middle">${label}</text>`;
  }).join("");
  const linePath = (samples, scale) => samples.map((sample, index) => `${index ? "L" : "M"}${xAt(index, samples.length).toFixed(2)},${scale.y(clearance(sample)).toFixed(2)}`).join(" ");
  const sunFill = `M${plot.left},${sunScale.y(0)} L${sun.map((sample, index) => `${xAt(index, sun.length).toFixed(2)},${sunScale.y(Math.max(0, clearance(sample))).toFixed(2)}`).join(" L")} L${width - plot.right},${sunScale.y(0)} Z`;
  const latestSun = sun.at(-1); const latestEarth = earth.at(-1);
  const dots = `<circle class="chart-point" cx="${width - plot.right}" cy="${sunScale.y(clearance(latestSun))}" r="4" fill="#edbd68"/><circle class="chart-point" cx="${width - plot.right}" cy="${earthScale.y(clearance(latestEarth))}" r="4" fill="#36d7f5"/>`;
  svg.innerHTML = `<g>${sunScale.grid}${earthScale.grid}${xTicks}<path class="chart-positive-fill" d="${sunFill}"/><path class="chart-line-sun" d="${linePath(sun, sunScale)}"/><path class="chart-line-earth" d="${linePath(earth, earthScale)}"/>${dots}</g>`;
}

function crossingTime(first, second, firstValue, secondValue) {
  const fraction = firstValue === secondValue ? 0.5 : Math.max(0, Math.min(1, -firstValue / (secondValue - firstValue)));
  return first.time + (second.time - first.time) * fraction;
}

function visibleIntervals(samples) {
  const intervals = [];
  if (samples.length < 2) return intervals;
  let start = samples[0].visibilityElevation > 0 ? samples[0].time : null;
  for (let index = 0; index < samples.length - 1; index += 1) {
    const first = samples[index]; const second = samples[index + 1];
    const firstVisible = first.visibilityElevation > 0;
    const secondVisible = second.visibilityElevation > 0;
    if (!firstVisible && secondVisible) start = crossingTime(first, second, first.visibilityElevation, second.visibilityElevation);
    else if (firstVisible && !secondVisible && start != null) {
      const end = crossingTime(first, second, first.visibilityElevation, second.visibilityElevation);
      intervals.push({ start, end }); start = null;
    }
  }
  if (start != null) intervals.push({ start, end: samples.at(-1).time });
  return intervals;
}

function renderTimeline(data) {
  const container = $("#windowTimeline");
  const start = new Date(`${data.start}T00:00:00Z`).getTime();
  const end = start + data.days * DAY_MS;
  const track = (label, samples, style) => {
    const windows = visibleIntervals(samples);
    const spans = windows.map((window) => {
      const left = Math.max(0, Math.min(100, (window.start - start) / (end - start) * 100));
      const width = Math.max(0.35, Math.min(100 - left, (window.end - window.start) / (end - start) * 100));
      const hours = (window.end - window.start) / 3_600_000;
      return `<i class="timeline-window ${style}" style="left:${left.toFixed(3)}%;width:${width.toFixed(3)}%" title="${fmtHours(hours)}"></i>`;
    }).join("");
    return `<div class="timeline-track"><strong>${label}</strong><div class="timeline-rail">${spans}</div><span>${windows.length} ${state.language === "az" ? "pəncərə" : "windows"}</span></div>`;
  };
  const dateLabels = [start, start + (end - start) / 2, end - 1].map((time) => {
    const date = new Date(time);
    return `<span>${String(date.getUTCDate()).padStart(2, "0")} ${date.toLocaleString(state.language === "az" ? "az-AZ" : "en-US", { month: "short", timeZone: "UTC" })}</span>`;
  });
  const radioWindows = data.earth.map((sample) => ({ ...sample, visibilityElevation: sample.terrainClearance - data.profile.earthMarginDeg }));
  container.innerHTML = `${track(t("sunTrack"), data.sun, "sun")}${track(t("earthTrack"), data.earth, "earth")}${track(t("linkTrack").replace("{margin}", data.profile.earthMarginDeg), radioWindows, "comms")}<div class="timeline-axis">${dateLabels.join("")}</div><p>${t("timelineTerrain")}</p>`;
}

function missionInputSignature() {
  try {
    const site = getCurrentSite();
    return JSON.stringify({ site: siteKey(site), altitudeKm: Number(site.altKm ?? 0), date: $("#startDate").value, days: Number($("#duration").value), panel: validatePanel() });
  } catch { return null; }
}

async function runMission() {
  if (state.busy) { state.missionRerunQueued = true; return; }
  if (state.searchBusy) return;
  let panel;
  try { panel = validatePanel(); } catch (error) { setStatus($("#requestStatus"), error.message, "error"); return; }
  const button = $("#runMission"); const label = button.querySelector("span:nth-child(2)");
  state.busy = true; button.disabled = true; label.textContent = t("running"); setStatus($("#requestStatus"), t("loading")); setDataStatus("checking");
  try {
    const days = Number($("#duration").value);
    const { start, stop } = getDateWindow($("#startDate").value, days);
    const site = { ...getCurrentSite() };
    const inputSignature = missionInputSignature();
    const [sun, earth, analysis] = await Promise.all([
      fetchEphemeris("10", site, start, stop),
      fetchEphemeris("399", site, start, stop),
      ensureSiteAnalysis(site).catch(() => null),
    ]);
    if (!inputSignature || inputSignature !== missionInputSignature()) {
      state.missionRerunQueued = true;
      setStatus($("#requestStatus"), t("inputsChanged"));
      return;
    }
    const data = summarizeSeries(sun, earth, start, days, panel.area, panel.efficiency, analysis, panel);
    state.lastData = data; renderMissionData(data);
    const currentTime = new Date().toISOString().slice(11, 16);
    setStatus($("#requestStatus"), t("liveResult").replace("{n}", sun.length).replace("{time}", currentTime), "success");
    setDataStatus("live");
  } catch (error) { setStatus($("#requestStatus"), error.message || t("apiError"), "error"); setDataStatus("offline"); }
  finally {
    state.busy = false; button.disabled = false; label.textContent = t("calculate");
    if (state.missionRerunQueued) {
      state.missionRerunQueued = false;
      setTimeout(runMission, 0);
    }
  }
}

function renderComparison(rows) {
  if (!rows?.length) return;
  $("#compareEmpty").classList.add("is-hidden"); $("#comparisonTableWrap").classList.remove("is-hidden");
  const ranked = [...rows].sort((a, b) => balancedIndex(b.result) - balancedIndex(a.result) || b.result.overlapHours - a.result.overlapHours);
  $("#comparisonRows").innerHTML = ranked.map(({ site, result }, index) => {
    const sunPercent = percentage(result.sunlightHours, result.totalHours).toFixed(1);
    const earthPercent = percentage(result.earthHours, result.totalHours).toFixed(1);
    const linkPercent = percentage(result.radioClearanceHours, result.totalHours).toFixed(1);
    const overlapPercent = percentage(result.overlapHours, result.totalHours).toFixed(1);
    const energy = result.energyKwh.toFixed(result.energyKwh < 10 ? 2 : 1);
    const score = balancedIndex(result).toFixed(1);
    return `<tr><td><strong>${index === 0 ? "★ " : ""}${siteName(site)}</strong><br/><small>${formatLat(site.lat)} · ${formatLon(site.lon)}</small></td><td><strong>${fmtHours(result.sunlightHours)}</strong><br/><small>${sunPercent}%</small></td><td><strong>${fmtHours(result.earthHours)}</strong><br/><small>${earthPercent}%</small></td><td><strong>${fmtHours(result.radioClearanceHours)}</strong><br/><small>${linkPercent}%</small></td><td><strong>${fmtHours(result.overlapHours)}</strong><br/><small>${overlapPercent}%</small></td><td><strong>${energy}</strong></td><td><strong>${score}%</strong><br/><small>50/50</small></td></tr>`;
  }).join("");
  $("#compareFoot").textContent = t("compareFoot").replace("{margin}", rows[0].result.profile?.earthMarginDeg ?? 5);
}

async function runComparison() {
  if (state.compareBusy || state.searchBusy) return;
  const selected = $$("#compareSiteOptions input:checked, #customComparePoints input:checked")
    .map((input) => sites[input.value] || state.comparePoints.find((site) => site.id === input.value))
    .filter(Boolean);
  if (selected.length < 2) { setStatus($("#compareStatus"), t("onlyTwoSites"), "error"); return; }
  const duration = Math.max(1, Math.min(31, Number($("#compareDuration").value) || 1));
  $("#compareDuration").value = duration;
  let panel;
  try { panel = validatePanel(); } catch (error) { setStatus($("#compareStatus"), error.message, "error"); return; }
  const button = $("#runCompare"); const label = button.querySelector("span:nth-child(2)");
  clearComparisonResults();
  state.compareBusy = true; button.disabled = true; label.textContent = t("running");
  $$("#compareSiteOptions input, #customComparePoints input, #customComparePoints button, #compareDate, #compareDuration, #comparePointName, #comparePointLat, #comparePointLon, #addComparePoint, #panelArea, #panelEfficiency, #earthMarginDeg")
    .forEach((input) => { input.disabled = true; });
  setStatus($("#compareStatus"), t("compareLoading"));
  const rows = [];
  try {
    const { start, stop } = getDateWindow($("#compareDate").value, duration);
    for (let index = 0; index < selected.length; index += 1) {
      const site = selected[index];
      setStatus($("#compareStatus"), t("liveCompareStep").replace("{site}", siteName(site)).replace("{index}", index + 1).replace("{total}", selected.length));
      const [sun, earth, analysis] = await Promise.all([
        fetchEphemeris("10", site, start, stop),
        fetchEphemeris("399", site, start, stop),
        ensureSiteAnalysis(site).catch(() => null),
      ]);
      rows.push({ site, result: summarizeSeries(sun, earth, start, duration, panel.area, panel.efficiency, analysis, panel) });
    }
    state.compareData = rows; renderComparison(rows);
    setStatus($("#compareStatus"), t("compareDone").replace("{n}", rows.length), "success");
    setDataStatus("live");
  } catch (error) { setStatus($("#compareStatus"), error.message || t("apiError"), "error"); setDataStatus("offline"); }
  finally {
    state.compareBusy = false; button.disabled = false; label.textContent = t("compareButton");
    $$("#compareSiteOptions input, #customComparePoints input, #customComparePoints button, #compareDate, #compareDuration, #comparePointName, #comparePointLat, #comparePointLon, #addComparePoint, #panelArea, #panelEfficiency, #earthMarginDeg")
      .forEach((input) => { input.disabled = false; });
  }
}

function renderBestWindows(candidates) {
  const container = $("#bestWindowResults");
  if (!candidates.length) {
    container.innerHTML = `<p class="best-window-empty">${t("searchEmpty")}</p>`;
    container.classList.remove("is-hidden");
    return;
  }
  container.innerHTML = candidates.slice(0, 3).map(({ date, result, score }, index) => {
    const dateText = new Date(`${date}T00:00:00Z`).toLocaleDateString(state.language === "az" ? "az-AZ" : "en-US", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
    return `<article class="best-window-card ${index === 0 ? "is-top" : ""}"><div class="best-window-card-head"><strong>${dateText}</strong><span>${t("bestWindowScore").replace("{score}", score.toFixed(1))}</span></div><div class="best-window-stats"><span>${t("bestWindowSun")} <b>${fmtHours(result.sunlightHours)}</b></span><span>${t("bestWindowEarth")} <b>${fmtHours(result.earthHours)}</b></span><span>${t("bestWindowLink")} ≥${result.profile.earthMarginDeg}° <b>${fmtHours(result.radioClearanceHours)}</b></span><span>${t("bestWindowEnergy")} <b>${result.energyKwh.toFixed(2)} kWh</b></span></div><button type="button" data-window-date="${date}">${t("useWindowDate")}</button></article>`;
  }).join("");
  container.classList.remove("is-hidden");
}

async function findBestWindow() {
  if (state.searchBusy || state.busy || state.compareBusy) return;
  let panel;
  try { panel = validatePanel(); } catch (error) { setStatus($("#requestStatus"), error.message, "error"); return; }
  const span = Math.max(30, Math.min(365, Number($("#searchSpan").value) || 180));
  const duration = Number($("#duration").value);
  if (span < duration) { setStatus($("#requestStatus"), t("rangeError"), "error"); return; }
  const button = $("#findBestWindow");
  state.searchBusy = true; button.disabled = true; $("#runMission").disabled = true; $("#runCompare").disabled = true;
  $("#bestWindowResults").classList.remove("is-hidden");
  $("#bestWindowResults").innerHTML = `<p class="best-window-empty">${t("searchLoading")}</p>`;
  setStatus($("#requestStatus"), t("searchLoading")); setDataStatus("checking");
  try {
    const startDate = $("#startDate").value;
    const { start, stop } = getDateWindow(startDate, span);
    const site = getCurrentSite();
    const [sun, earth, analysis] = await Promise.all([
      fetchEphemeris("10", site, start, stop, "6 h"),
      fetchEphemeris("399", site, start, stop, "6 h"),
      ensureSiteAnalysis(site).catch(() => null),
    ]);
    const samplesPerDay = 4;
    const pointsPerWindow = duration * samplesPerDay;
    const candidates = [];
    const lastStart = Math.min(sun.length, earth.length) - pointsPerWindow - 1;
    for (let index = 0; index <= lastStart; index += samplesPerDay) {
      const windowSun = sun.slice(index, index + pointsPerWindow + 1);
      const windowEarth = earth.slice(index, index + pointsPerWindow + 1);
      if (windowSun.length !== pointsPerWindow + 1 || windowEarth.length !== pointsPerWindow + 1) continue;
      const date = new Date(windowSun[0].time).toISOString().slice(0, 10);
      const result = summarizeSeries(windowSun, windowEarth, date, duration, panel.area, panel.efficiency, analysis, panel);
      candidates.push({ date, result, score: balancedIndex(result) });
    }
    candidates.sort((a, b) => b.score - a.score || b.result.overlapHours - a.result.overlapHours || b.result.energyKwh - a.result.energyKwh);
    state.bestWindows = candidates.slice(0, 3);
    renderBestWindows(state.bestWindows);
    setStatus($("#requestStatus"), t("searchDone").replace("{n}", state.bestWindows.length), "success");
    setDataStatus("live");
  } catch (error) {
    $("#bestWindowResults").innerHTML = ""; $("#bestWindowResults").classList.add("is-hidden");
    setStatus($("#requestStatus"), error.message || t("apiError"), "error"); setDataStatus("offline");
  } finally {
    state.searchBusy = false; button.disabled = false; $("#runMission").disabled = false; $("#runCompare").disabled = false;
  }
}

function initialize() {
  const today = new Date().toISOString().slice(0, 10);
  $("#startDate").value = today; $("#compareDate").value = today;
  $("#workspaceDate").textContent = `UTC · ${new Date().getUTCFullYear()}`;
  applyLanguage(); initializeMap();
  $$(".view-tab").forEach((tab) => tab.addEventListener("click", () => switchView(tab.dataset.view)));
  $("#roadmapJump").addEventListener("click", openRoadmap);
  $$('[data-view-link]').forEach((link) => link.addEventListener("click", () => switchView(link.dataset.viewLink)));
  $("#languageToggle").addEventListener("click", () => { state.language = state.language === "az" ? "en" : "az"; applyLanguage(); });
  $("#siteSelect").addEventListener("change", (event) => {
    state.currentSite = event.target.value; state.lastData = null; clearMissionData(); clearScoutGrid(); resetTerrainFacts(); refreshSite();
    $("#requestStatus").textContent = "";
    if (state.busy) state.missionRerunQueued = true;
    ensureSiteAnalysis(getCurrentSite()).catch(() => null);
  });
  $("#duration").addEventListener("input", (event) => { $("#durationValue").textContent = event.target.value; state.lastData = null; clearMissionData(); $("#requestStatus").textContent = ""; if (state.busy) state.missionRerunQueued = true; });
  $("#startDate").addEventListener("change", () => { state.lastData = null; clearMissionData(); $("#requestStatus").textContent = ""; if (state.busy) state.missionRerunQueued = true; });
  $("#runMission").addEventListener("click", runMission);
  $("#runCompare").addEventListener("click", runComparison);
  $("#addComparePoint").addEventListener("click", addComparePoint);
  $$("#compareSiteOptions input").forEach((input) => input.addEventListener("change", clearComparisonResults));
  $("#compareDate").addEventListener("change", clearComparisonResults);
  $("#compareDuration").addEventListener("input", clearComparisonResults);
  $("#decemberCheck").addEventListener("click", () => {
    state.currentSite = "landingA";
    $("#siteSelect").value = "landingA";
    clearScoutGrid(); resetTerrainFacts(); refreshSite();
    $("#startDate").value = "2026-12-01"; $("#duration").value = "30"; $("#durationValue").textContent = "30";
    state.lastData = null; clearMissionData(); setStatus($("#requestStatus"), t("decemberStatus")); runMission();
  });
  $("#focusPsr").addEventListener("click", focusPsrRoute);
  $("#exportMission").addEventListener("click", exportMissionReport);
  $("#scoutButton").addEventListener("click", scanCandidateArea);
  $("#scoutMetric").addEventListener("change", renderScoutGrid);
  $("#findBestWindow").addEventListener("click", findBestWindow);
  $("#bestWindowResults").addEventListener("click", (event) => {
    const button = event.target.closest("[data-window-date]");
    if (!button) return;
    $("#startDate").value = button.dataset.windowDate;
    state.lastData = null; clearMissionData();
    runMission();
  });
  $("#resetMap").addEventListener("click", centerMap);
  $("#psrToggle").addEventListener("click", togglePsrLayer);
  const recomputeEnergy = () => {
    if (!state.lastData) return;
    try { const panel = validatePanel(); state.lastData = summarizeSeries(state.lastData.sun, state.lastData.earth, state.lastData.start, state.lastData.days, panel.area, panel.efficiency, state.lastData.analysis, panel); renderMissionData(state.lastData); }
    catch (error) { setStatus($("#requestStatus"), error.message, "error"); }
  };
  const handleMissionProfileChange = () => {
    recomputeEnergy(); clearComparisonResults();
    if (state.busy) state.missionRerunQueued = true;
  };
  $("#panelArea").addEventListener("change", handleMissionProfileChange);
  $("#panelEfficiency").addEventListener("change", handleMissionProfileChange);
  $("#averageLoadW").addEventListener("change", handleMissionProfileChange);
  $("#batteryCapacityWh").addEventListener("change", handleMissionProfileChange);
  $("#earthMarginDeg").addEventListener("change", () => {
    $("#scoreNote").textContent = t("windowScoreNote").replace("{margin}", $("#earthMarginDeg").value);
    if (state.lastData) recomputeEnergy();
    clearComparisonResults();
    if (state.busy) state.missionRerunQueued = true;
  });
  setTimeout(runMission, 350);
}

initialize();
