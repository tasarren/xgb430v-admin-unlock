# XGB430v unlock

Reveals the hidden menus of the **Digi TP-Link XGB430v Pro** (BE7200 Wi-Fi 7 XGS-PON router) web UI:
QoS, Security, VPN, GPON WAN settings, 3G/4G, and the Internet entry on the Basic tab; everything the
ISP-restricted account normally cannot see.

Tested on our unit: **Digi TP-Link XGB430v Pro, hardware v1.0, firmware `0.2.0 3.2.1 v60c3.0 Build 250808 Rel.72518n`**
(`Hardware Version:XGB430v Pro v1.0`). Other hardware or firmware revisions are untested; they may work,
they may not (the flag in `js/oid_str.js` has to exist in the same frozen form).

| With the script | Default (ISP) |
| --- | --- |
| ![advanced patched](screenshots/advanced-patched.png) | ![advanced default](screenshots/advanced-default.png) |

## What it does

The router firmware ships ~1600 feature flags (`INCLUDE_*`) in `js/oid_str.js`. One of them,
`INCLUDE_USER_RESTRICTION`, is what hides the menus for the restricted account. The firmware freezes it:

```js
Object.defineProperty(window, 'INCLUDE_USER_RESTRICTION', { value: 1, writable: false });
```

Non-configurable, so devtools or bookmarklets can not change it after load. This project installs a hook
**before** `oid_str.js` runs and rewrites that single `defineProperty` call:

```js
const define = Object.defineProperty;
Object.defineProperty = function (target, prop, descriptor) {
  if (target === window && prop === 'INCLUDE_USER_RESTRICTION') {
    descriptor = { value: 0, writable: true, configurable: true };
  }
  return define(target, prop, descriptor);
};
```

That is the whole trick; 10 lines in `unlock.user.js`.

**Client-side only.** It changes what the UI renders; it never changes router config by itself, and the
server may still reject operations the ISP disabled. It does not bypass login.

### Unlocked vs default

| Unlocked (script) | Default (ISP) |
| --- | --- |
| **Basic → Internet**: menu entry for WAN/4G internet setup | no Internet entry anywhere in the Basic menu |
| **Basic → USB Sharing → 3G/4G Settings**: USB modem settings (APN, PIN, dial number, manual dial) | USB Sharing only has USB Storage Device |
| **Network → Internet**: WAN/broadband connection page | entry missing |
| **Network → GPON WAN**: XGS-PON service page (GPON Settings: PPPoE `pppoe_gpon_20_1`, VLAN 20, IPoE) | entry missing; page unreachable |
| **Network → Static Routing**: static route table (add/modify/delete) | entry missing |
| **Network → RIP Settings**: RIP protocol configuration | entry missing |
| **Network**: full submenu (Internet, GPON WAN, GPON Settings, LAN Settings, Dynamic DNS, Static Routing, RIP) | submenu reduced to LAN Settings + Dynamic DNS |
| **QoS**: main-menu section with Traffic Control page (VoIP QoS toggle, priority bands High 60% / Middle 30% / Low 10%, per-device QoS Rule List) | no QoS menu at all |
| **VPN**: main-menu section with server pages for OpenVPN, PPTP VPN, IPSec VPN and VPN Connections | no VPN menu at all |
| **Telephony**: full submenu, adds Telephone Book, Digit Map, DND & Call Blocking, Call Forwarding | only Telephone Number and Call Log |
| **System Tools → Firmware Upgrade**: upgrade page with hardware/firmware version and serial number | entry missing |
| **System Tools → System Log**: log viewer, filtering and export | entry missing |
| Same on both: Status, Network Map, Wireless, Guest Network, Multi-SSID, Telephony basics, NAT Forwarding (ALG, Virtual Servers, Port Triggering, DMZ, UPnP), USB Storage Device, Parental Controls, Security, Diagnostics, Administration, Mesh | those work without the script |

## Screenshots

| Page | Script | Default |
| --- | --- | --- |
| VPN | <a href="screenshots/adv-vpn-patched.png"><img src="screenshots/adv-vpn-patched.png" width="240" alt="vpn patched" /></a> | Not available |
| Static routing | <a href="screenshots/adv-network-static-routing-patched.png"><img src="screenshots/adv-network-static-routing-patched.png" width="240" alt="static routing patched" /></a> | Not available |
| QoS Traffic | <a href="screenshots/adv-qos-traffic-patched.png"><img src="screenshots/adv-qos-traffic-patched.png" width="240" alt="qos patched" /></a> | Not available |
| GPON WAN | <a href="screenshots/adv-network-gpon-patched.png"><img src="screenshots/adv-network-gpon-patched.png" width="240" alt="gpon patched" /></a> | Not available |
| RIP | <a href="screenshots/adv-network-rip-patched.png"><img src="screenshots/adv-network-rip-patched.png" width="240" alt="rip patched" /></a> | Not available |
| Logs | <a href="screenshots/adv-logs-patched.png"><img src="screenshots/adv-logs-patched.png" width="240" alt="logs patched" /></a> | Not available |
| Firmware update | <a href="screenshots/adv-firm-update-patched.png"><img src="screenshots/adv-firm-update-patched.png" width="240" alt="firmware patched" /></a> | Not available |
| 4G router | <a href="screenshots/adv-4g-router-patched.png"><img src="screenshots/adv-4g-router-patched.png" width="240" alt="4g patched" /></a> | Not available |
| 4G (Basic) | <a href="screenshots/4g-router-patched.png"><img src="screenshots/4g-router-patched.png" width="240" alt="4g basic patched" /></a> | Not available |
| Gateways | <a href="screenshots/adv-network-gateways-patched.png"><img src="screenshots/adv-network-gateways-patched.png" width="240" alt="gateways patched" /></a> | Not available |
| Phone book | <a href="screenshots/adv-telephony-book-patched.png"><img src="screenshots/adv-telephony-book-patched.png" width="240" alt="phone book patched" /></a> | Not available |
| Call forwarding | <a href="screenshots/adv-telephony-call-forward-patched.png"><img src="screenshots/adv-telephony-call-forward-patched.png" width="240" alt="call forwarding patched" /></a> | Not available |
| DND & call block | <a href="screenshots/adv-telephony-dnd-call-block-patched.png"><img src="screenshots/adv-telephony-dnd-call-block-patched.png" width="240" alt="dnd patched" /></a> | Not available |
| Advanced | <a href="screenshots/advanced-patched.png"><img src="screenshots/advanced-patched.png" width="240" alt="advanced patched" /></a> | <a href="screenshots/advanced-default.png"><img src="screenshots/advanced-default.png" width="240" alt="advanced default" /></a> |
| Home | <a href="screenshots/home-patched.png"><img src="screenshots/home-patched.png" width="240" alt="home patched" /></a> | <a href="screenshots/home-default.png"><img src="screenshots/home-default.png" width="240" alt="home default" /></a> |
| Administration | <a href="screenshots/adv-admin-patched.png"><img src="screenshots/adv-admin-patched.png" width="240" alt="admin patched" /></a> | <a href="screenshots/adv-admin-default.png"><img src="screenshots/adv-admin-default.png" width="240" alt="admin default" /></a> |
| Telephony | <a href="screenshots/adv-telephony-patched.png"><img src="screenshots/adv-telephony-patched.png" width="240" alt="telephony patched" /></a> | <a href="screenshots/adv-telephony-default.png"><img src="screenshots/adv-telephony-default.png" width="240" alt="telephony default" /></a> |

"Not available" = the page is hidden by default
under the ISP restriction, so no default screenshot exists.

## Install

Two ways, same file:

**A. Userscript manager (Tampermonkey / Violentmonkey)**

1. Install the extension in your browser.
2. Create a new script, paste the contents of `unlock.user.js`, save.
3. Open the router UI and reload.

**B. Browser extension (Manifest V3)**

1. `chrome://extensions` (or `edge://extensions`).
2. Enable **Developer mode**.
3. **Load unpacked** → select this repository folder (the one with `manifest.json`).

The manifest injects `unlock.user.js` at `document_start` into the page's `MAIN` world, in all frames;
the timing and world required to run before `oid_str.js` freezes the flag.

## Change the router IP

The script only runs on the router address it was told about. It defaults to `192.168.1.1`; change it if
your router uses another address (check the label on the device or your default gateway:
`ip route`, `ipconfig /all`, System Settings → Network).

**1. `unlock.user.js` lines 4–5:**

```js
// @match        http://192.168.1.1/*
// @match        https://192.168.1.1/*
```

replace `192.168.1.1` with your router's IP in both lines, e.g.:

```js
// @match        http://192.168.0.1/*
// @match        https://192.168.0.1/*
```

**2. `manifest.json` line 8 (same replacement):**

```json
"matches": ["http://192.168.1.1/*", "https://192.168.1.1/*"]
```

becomes, for example:

```json
"matches": ["http://192.168.0.1/*", "https://192.168.0.1/*"]
```

**3. Reload:** reinstall/re-enable the userscript, or press the reload button on the unpacked extension,
then reload the router page.

Keep the `/*` path wildcard and both `http`/`https` lines; some firmwares serve one or the other.
Common gateway addresses: `192.168.0.1`, `192.168.1.1`, `192.168.1.254`, `192.168.100.1`.

## Recommended: keep the ISP out of your box

The script only changes what the browser renders. The ISP still has a management channel into the router
(TR-069/CWMP) and can push changes or revert yours, usually after a reboot or a firmware update. Before
you start changing settings:

1. **Leave remote management off**: Administration → "Manage this Router via the Address". If you turn it
   on, the router answers on its public IP (the screenshots show `http://<public IP>` sitting there).
2. **Turn off TR-069 / ACS** if your firmware exposes the option (look for TR-069 or CWMP under
   Network/Management). That is the channel the ISP uses to re-provision the box and undo user changes.
   Some ISPs need it to activate the service: if your internet dies after disabling it, turn it back on.
3. **Set a strong admin password** on the Administration page while you are there.

Remember: all of this is client side; the server side policy still wins.

## Notes

- Works only while the flag mechanism stays as-is; a firmware update may change `oid_str.js`.
- Hidden for a reason: enabling a menu does not guarantee the ISP's server-side policy allows the feature.
- Screenshots are regenerated by `.orchestrator/scripts/screenshots/build.py` from `screenshots/raw/`:
  detect the two windows → OCR (cached) → redact → save each window as `-patched`/`-default`.
