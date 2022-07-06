Events.on(EventType.ClientLoadEvent, event => {
	var button = new TextButton(" funny ", Styles.clearTogglet);
	button.clicked(() => {
		if (Core.settings.getString("locale") == "ohno") return;
		Core.settings.put("locale", "ohno");
		Log.info("Setting locale: @", "ohno");
		Vars.ui.showInfo("@language.restart");
	});

	var widget = getCell(Vars.ui.language, [1, 0]).getWidget();
	widget.add(button).group(getCell(widget, [0]).getButtonGroup()).update(t => {
		t.setChecked(Core.settings.getString("locale") == "ohno");
	}).size(400, 50).row();
});

// why download a mod if you play in another language?
if (Core.settings.getString("locale") != "ohno") return;

// translate meta
var meta = Vars.mods.locateMod("ohno").meta;
meta.author = "[purple]pUrpel[accent]SushI[royal]22";
meta.displayName = "oj no and NegativE Tials";
meta.description = "oH GOd WHat AHhaVe YoUD ONe"

// create a new bundle
var file = Vars.mods.locateMod("ohno").root.child("bundles").child("bundle_ohno.properties");
PropertiesUtils.load(Core.bundle.getProperties(), file.reader());
Vars.content.each(update); // update localized strings

function update(item) {
	// idk why but on mobile the item can be null
	if (item instanceof UnlockableContent == false) return;

	var type = item.getContentType() + "." + item.name;
	item.localizedName = Core.bundle.get(type + ".name", item.name);
	item.description = Core.bundle.getOrNull(type + ".description");
	item.details = Core.bundle.getOrNull(type + ".details");
}

function getCell(item, index) {
	index.forEach(id => item = item.getCells().get(id).get());
	return item;
}
