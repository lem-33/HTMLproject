const axios = require('axios');
const db = require('./database');
const BASE_URL = "https://api.modrinth.com/v2/search";
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// 🔹 mods
async function fetchMods(offset = 0) {
  const res = await axios.get(BASE_URL, {
    params: {
      query: "",
      limit: 50,
      offset: offset,
      facets: JSON.stringify([["project_type:mod"]])
    }
  });
  console.log("fetchMods:", res.data.hits.length, "hits");
  return res.data.hits;
}
// 🔹 modpacks
async function fetchModpacks(offset = 0) {
  const res = await axios.get(BASE_URL, {
    params: {
      query: "",
      limit: 50,
      offset: offset,
      facets: JSON.stringify([["project_type:modpack"]])
    }
  });
  console.log("fetchModpacks:", res.data.hits.length, "hits");
  return res.data.hits;
}
// 💾 save mod
function saveMod(mod) {
  db.run(
    `INSERT OR IGNORE INTO mods 
    (id, name, description, downloads, slug, icon, categories)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      mod.project_id,
      mod.title,
      mod.description || "",
      mod.downloads || 0,
      mod.slug,
      mod.icon_url || "",
      JSON.stringify(mod.categories || [])
    ]
  );
}
// 💾 save modpack
function saveModpack(mod) {
  db.run(
    `INSERT OR IGNORE INTO modpacks 
    (id, name, description, downloads, slug, icon, categories)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      mod.project_id,
      mod.title,
      mod.description || "",
      mod.downloads || 0,
      mod.slug,
      mod.icon_url || "",
      JSON.stringify(mod.categories || [])
    ]
  );
}
// 🔄 fetch all mods
async function fetchAllMods() {
  let offset = 0;
  while (true) {
    console.log("Mods offset:", offset);
    const mods = await fetchMods(offset);
    if (mods.length === 0) break;
    mods.forEach(mod => {
      console.log(mod.project_id, mod.title); // debug
      saveMod(mod);
    });
    offset += 50;
    await sleep(300);
  }
  console.log("✅ Mods importés");
}
// 🔄 fetch all modpacks
async function fetchAllModpacks() {
  let offset = 0;
  while (true) {
    console.log("Modpacks offset:", offset);
    const mods = await fetchModpacks(offset);
    if (mods.length === 0) break;
    mods.forEach(mod => {
      console.log(mod.project_id, mod.title); // debug
      saveModpack(mod);
    });
    offset += 50;
    await sleep(300);
  }
  console.log("✅ Modpacks importés");
}
// 🚀 lancement
fetchAllMods();
fetchAllModpacks();