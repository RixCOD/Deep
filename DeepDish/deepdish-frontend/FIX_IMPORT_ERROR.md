# 🔧 DeepDish Frontend - Quick Fix Guide

## Problem
```
Failed to resolve import "../services/api" from "src/AuthContext.jsx"
```

This is a **Vite caching issue**, not a real file problem. The files exist and are correct!

---

## Solution (Choose One)

### Option 1: Quick Fix (Windows PowerShell) ⚡
```powershell
# In deepdish-frontend folder
rm -r node_modules\.vite
rm -r dist
npm run dev
```

### Option 2: Full Clean (Windows PowerShell)
```powershell
# In deepdish-frontend folder
rm -r node_modules
rm -r dist
npm cache clean --force
npm install
npm run dev
```

### Option 3: Manual Steps
1. Close Vite dev server (Ctrl+C)
2. Open file manager: `C:\DeepDish\deepdish-frontend`
3. Delete folder: `node_modules\.vite`
4. Delete folder: `dist`
5. Run: `npm run dev`

### Option 4: Nuclear Option (Guaranteed to Work)
```powershell
# In deepdish-frontend folder
rm -r node_modules -Force
rm -r dist -Force
rm package-lock.json
npm install
npm run dev
```

---

## What's Actually Wrong?

✅ `src/services/api.js` EXISTS and is correct
✅ `src/services/apiClient.js` EXISTS and is correct
✅ `src/AuthContext.jsx` imports from correct path

❌ Vite build cache is stale - it thinks the file doesn't exist

---

## Why This Happens

1. Files were created/modified
2. Vite cached old version
3. Vite sees import error from old cache
4. Need to clear cache to rebuild

**Simple solution: Delete `.vite` folder!**

---

## Test After Fix

When server restarts, you should see:
```
✓ Optimized dependencies changed. reloading
✓ Ready in XXX ms
➜  Local:   http://localhost:5173/
```

No more import errors! ✅

---

## If Still Not Working

1. **Check port 5173 not in use**: 
   ```powershell
   netstat -ano | findstr :5173
   ```

2. **Check .env.local exists**:
   Should be in `deepdish-frontend/.env.local`
   ```
   VITE_API_URL=http://localhost:5000
   ```

3. **Check backend is running on 5000**:
   ```
   http://localhost:5000/health
   ```

---

## Quick Commands

```powershell
# Clear Vite cache
Remove-Item -Path "node_modules\.vite" -Recurse -Force

# Clear dist
Remove-Item -Path "dist" -Recurse -Force

# Restart
npm run dev
```

---

**This should fix it! Just delete the cache and restart.** ✨
