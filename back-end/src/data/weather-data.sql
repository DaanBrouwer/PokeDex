DROP TABLE IF EXISTS weatherstation;

CREATE TABLE weatherstation (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT
);

CREATE TABLE weatherstation_measurement (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,  
    weatherstation_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    value TEXT NOT NULL,
    date TEXT NOT NULL
);

INSERT INTO weatherstation (id, name) VALUES(1, 'Pallet Town');
INSERT INTO weatherstation (id, name) VALUES(2, 'Viridian City');
INSERT INTO weatherstation (id, name) VALUES(3, 'Pewter City');
INSERT INTO weatherstation (id, name) VALUES(4, 'Cerulean City');
INSERT INTO weatherstation (id, name) VALUES(5, 'Vermilion City');
INSERT INTO weatherstation (id, name) VALUES(6, 'Lavender Town');
INSERT INTO weatherstation (id, name) VALUES(7, 'Celadon City');
INSERT INTO weatherstation (id, name) VALUES(8, 'Saffron City');
INSERT INTO weatherstation (id, name) VALUES(9, 'Fuchsia City');
INSERT INTO weatherstation (id, name) VALUES(10, 'Cinnabar Island');
INSERT INTO weatherstation (id, name) VALUES(11, 'New Bark Town');
INSERT INTO weatherstation (id, name) VALUES(12, 'Cherrygrove City');
INSERT INTO weatherstation (id, name) VALUES(13, 'Violet City');
INSERT INTO weatherstation (id, name) VALUES(14, 'Azalea Town');
INSERT INTO weatherstation (id, name) VALUES(15, 'Goldenrod City');
INSERT INTO weatherstation (id, name) VALUES(16, 'Ecruteak City');
INSERT INTO weatherstation (id, name) VALUES(17, 'Olivine City');
INSERT INTO weatherstation (id, name) VALUES(18, 'Frontier Access');
INSERT INTO weatherstation (id, name) VALUES(19, 'Cianwood City');
INSERT INTO weatherstation (id, name) VALUES(20, 'Mahogany Town');
INSERT INTO weatherstation (id, name) VALUES(21, 'Blackthorn City');
INSERT INTO weatherstation (id, name) VALUES(22, 'Littleroot Town');
INSERT INTO weatherstation (id, name) VALUES(23, 'Oldale Town');
INSERT INTO weatherstation (id, name) VALUES(24, 'Petalburg City');
INSERT INTO weatherstation (id, name) VALUES(25, 'Rustboro City');
INSERT INTO weatherstation (id, name) VALUES(26, 'Dewford Town');
INSERT INTO weatherstation (id, name) VALUES(27, 'Slateport City');
INSERT INTO weatherstation (id, name) VALUES(28, 'Mauville City');
INSERT INTO weatherstation (id, name) VALUES(29, 'Verdanturf Town');
INSERT INTO weatherstation (id, name) VALUES(30, 'Fallarbor Town');
INSERT INTO weatherstation (id, name) VALUES(31, 'Lavaridge Town');
INSERT INTO weatherstation (id, name) VALUES(32, 'Fortree City');
INSERT INTO weatherstation (id, name) VALUES(33, 'Lilycove City');
INSERT INTO weatherstation (id, name) VALUES(34, 'Mossdeep City');
INSERT INTO weatherstation (id, name) VALUES(35, 'Sootopolis City');
INSERT INTO weatherstation (id, name) VALUES(36, 'Pacifidlog Town');
INSERT INTO weatherstation (id, name) VALUES(37, 'Ever Grande City');
INSERT INTO weatherstation (id, name) VALUES(38, 'Twinleaf Town');
INSERT INTO weatherstation (id, name) VALUES(39, 'Sandgem Town');
INSERT INTO weatherstation (id, name) VALUES(40, 'Jubilife City');
INSERT INTO weatherstation (id, name) VALUES(41, 'Oreburgh City');
INSERT INTO weatherstation (id, name) VALUES(42, 'Floaroma Town');
INSERT INTO weatherstation (id, name) VALUES(43, 'Eterna City');
INSERT INTO weatherstation (id, name) VALUES(44, 'Hearthome City');
INSERT INTO weatherstation (id, name) VALUES(45, 'Solaceon Town');
INSERT INTO weatherstation (id, name) VALUES(46, 'Veilstone City');
INSERT INTO weatherstation (id, name) VALUES(47, 'Pastoria City');
INSERT INTO weatherstation (id, name) VALUES(48, 'Celestic Town');
INSERT INTO weatherstation (id, name) VALUES(49, 'Canalave City');
INSERT INTO weatherstation (id, name) VALUES(50, 'Snowpoint City');
INSERT INTO weatherstation (id, name) VALUES(51, 'Sunyshore City');
INSERT INTO weatherstation (id, name) VALUES(52, 'Nuvema Town');
INSERT INTO weatherstation (id, name) VALUES(53, 'Accumula Town');
INSERT INTO weatherstation (id, name) VALUES(54, 'Striaton City');
INSERT INTO weatherstation (id, name) VALUES(55, 'Nacrene City');
INSERT INTO weatherstation (id, name) VALUES(56, 'Aspertia City');
INSERT INTO weatherstation (id, name) VALUES(57, 'Floccesy Town');
INSERT INTO weatherstation (id, name) VALUES(58, 'Virbank City');
INSERT INTO weatherstation (id, name) VALUES(59, 'Castelia City');
INSERT INTO weatherstation (id, name) VALUES(60, 'Nimbasa City');
INSERT INTO weatherstation (id, name) VALUES(61, 'Anville Town');
INSERT INTO weatherstation (id, name) VALUES(62, 'Driftveil City');
INSERT INTO weatherstation (id, name) VALUES(63, 'Mistralton City');
INSERT INTO weatherstation (id, name) VALUES(64, 'Icirrus City');
INSERT INTO weatherstation (id, name) VALUES(65, 'Opelucid City');
INSERT INTO weatherstation (id, name) VALUES(66, 'Lacunosa Town');
INSERT INTO weatherstation (id, name) VALUES(67, 'Undella Town');
INSERT INTO weatherstation (id, name) VALUES(68, 'Lentimas Town');
INSERT INTO weatherstation (id, name) VALUES(69, 'Humilau City');
INSERT INTO weatherstation (id, name) VALUES(70, 'Vaniville Town');
INSERT INTO weatherstation (id, name) VALUES(71, 'Aquacorde Town');
INSERT INTO weatherstation (id, name) VALUES(72, 'Santalune City');
INSERT INTO weatherstation (id, name) VALUES(73, 'Lumiose City');
INSERT INTO weatherstation (id, name) VALUES(74, 'Coumarine City');
INSERT INTO weatherstation (id, name) VALUES(75, 'Shalour City');
INSERT INTO weatherstation (id, name) VALUES(76, 'Geosenge Town');
INSERT INTO weatherstation (id, name) VALUES(77, 'Cyllage City');
INSERT INTO weatherstation (id, name) VALUES(78, 'Ambrette Town');
INSERT INTO weatherstation (id, name) VALUES(79, 'Laverre City');
INSERT INTO weatherstation (id, name) VALUES(80, 'Denemille Town');
INSERT INTO weatherstation (id, name) VALUES(81, 'Anistar City');
INSERT INTO weatherstation (id, name) VALUES(82, 'Couriway Town');
INSERT INTO weatherstation (id, name) VALUES(83, 'Snowbelle City');
INSERT INTO weatherstation (id, name) VALUES(84, 'Kiloude City');