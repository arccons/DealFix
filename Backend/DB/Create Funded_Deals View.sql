CREATE VIEW funded_deals_v AS 
	SELECT TOP (100) PERCENT id, dealName, effectiveDate, closingDate, subSector, isLiquid
	FROM  dbo.Deals AS d
	WHERE EXISTS (SELECT m.deal_id FROM  dbo.Deals INNER JOIN dbo.mappings AS m ON d.id = m.deal_id)
	ORDER BY id, dealName