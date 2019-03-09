#[macro_use]
extern crate cfg_if;
extern crate ff4;
extern crate js_sys;
extern crate web_sys;
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

macro_rules! console_log {
    // Note that this is using the `log` function imported above during
    // `bare_bones`
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

cfg_if! {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function to get better error messages if we ever panic.
    if #[cfg(feature = "console_error_panic_hook")] {
        extern crate console_error_panic_hook;
        use console_error_panic_hook::set_once as set_panic_hook;
    } else {
        #[inline]
        fn set_panic_hook() {}
    }
}

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
pub struct Ff4Service {
    ff4: ff4::Ff4,
}

impl Ff4Service {
    pub fn new(ff4: ff4::Ff4) -> Ff4Service {
        Ff4Service{
            ff4
        }
    }
}

#[wasm_bindgen]
impl Ff4Service {
    pub fn get_monsters(&self) -> Result<JsValue, JsValue> {
        Ok(JsValue::from_serde(&self.ff4.monsters)
            .map_err(|e| JsValue::from_str(&e.to_string()))?)
    }
}

// Called by our JS entry point to run the example.
#[wasm_bindgen]
pub fn run() -> JsValue {
    set_panic_hook();
    JsValue::from_str("test")
}

#[wasm_bindgen]
pub fn load_rom(rom: &[u8]) -> Result<Ff4Service, JsValue> {
    let ff4 = ff4::parse_rom(rom).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(Ff4Service::new(ff4))
}