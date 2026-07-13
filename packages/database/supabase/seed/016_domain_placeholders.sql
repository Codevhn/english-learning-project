-- 016_domain_placeholders.sql
-- "Coming soon" domains for Rutas de Enfoque — visible in the grid so it
-- reads as a populated roadmap, but with no modules/lessons yet, so the
-- UI renders them as "Próximamente" rather than letting users select an
-- empty domain. Content for each will be added in a later pass.
-- Run AFTER migrations/006_domains.sql.

DELETE FROM domains WHERE id IN (
  'a0000001-0000-0000-0000-000000000002',
  'a0000001-0000-0000-0000-000000000003',
  'a0000001-0000-0000-0000-000000000004',
  'a0000001-0000-0000-0000-000000000005'
);

INSERT INTO domains (id, slug, title, description, icon, order_index, is_published) VALUES
('a0000001-0000-0000-0000-000000000002', 'oficina', '{"es": "Oficina y Trabajo", "en": "Office and Work"}'::jsonb, '{"es": "Vocabulario para reuniones, correos electrónicos y el día a día en una oficina.", "en": "Vocabulary for meetings, emails, and everyday office life."}'::jsonb, 'Briefcase', 2, true),
('a0000001-0000-0000-0000-000000000003', 'viajes', '{"es": "Viajes", "en": "Travel"}'::jsonb, '{"es": "Frases esenciales para el aeropuerto, el hotel, pedir direcciones y manejar emergencias en un viaje.", "en": "Essential phrases for the airport, hotel, asking for directions, and handling emergencies while traveling."}'::jsonb, 'Plane', 3, true),
('a0000001-0000-0000-0000-000000000004', 'cocina', '{"es": "Cocina", "en": "Cooking"}'::jsonb, '{"es": "Vocabulario de ingredientes, utensilios y pasos para seguir recetas en inglés.", "en": "Vocabulary for ingredients, kitchen tools, and following recipes in English."}'::jsonb, 'ChefHat', 4, true),
('a0000001-0000-0000-0000-000000000005', 'redes-it', '{"es": "Redes e IT", "en": "Networking and IT"}'::jsonb, '{"es": "Vocabulario técnico de redes, infraestructura y soporte técnico.", "en": "Technical vocabulary for networking, infrastructure, and IT support."}'::jsonb, 'Network', 5, true);
