java -jar compiler.jar \
	--js=libs/easeljs-NEXT.min.js --js=libs/soundjs-0.5.2.min.js --js=libs/preload-NEXT.min.js \
	\
	--js=levels/wastemanlevel.js --js=levels/accountingmanlevel.js  --js=levels/materialmanlevel.js --js=levels/visionarymanlevel.js \
	--js=levels/warehousemanlevel.js \
	\
	--js=objects/healthbar.js --js=objects/death.js --js=objects/bosspoint.js --js=objects/door.js --js=objects/explosivebarrel.js \
	--js=objects/platform.js --js=objects/droppingplatform.js --js=objects/disappearingplatform.js --js=objects/rotatingplatform.js \
	--js=objects/bosshealthbar.js --js=objects/bighealth.js --js=objects/littlehealth.js --js=objects/extralife.js --js=objects/beam.js \
	--js=objects/halfwaypoint.js \
	\
	--js=enemies/killcopy.js --js=enemies/wasteman.js  --js=enemies/accountingman.js --js=enemies/printerguy.js \
	--js=enemies/flood.js --js=enemies/shieldguy.js --js=enemies/copter.js --js=enemies/phone.js \
	--js=enemies/filingcabinet.js --js=enemies/warehouseman.js --js=enemies/materialman.js \
	\
	 --js=mechanics/main.js --js=mechanics/collision.js --js=mechanics/fastCollision.js \
	--js=mechanics/renderer.js --js=mechanics/player.js  --js=mechanics/titlescreen.js \
	--js=mechanics/pausemenu.js --js=mechanics/shopmenu.js --js=mechanics/showoffboss.js \
	--js=mechanics/bossscreen.js --js=mechanics/soundwrapper.js --js=mechanics/basiccollision.js \
	--js=mechanics/savesystem.js \
	\
	--js_output_file=game.min.js