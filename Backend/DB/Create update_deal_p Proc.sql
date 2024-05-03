SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE dbo.update_deal_p
	(@id nchar(10), @effectiveDate Date, @closingDate Date = '', @subSector varchar(50) = '', @isLiquid char(10) = '')
AS 
	BEGIN 
		UPDATE dbo.Deals 
		SET effectiveDate = @effectiveDate, closingDate = @closingDate, subSector = @subSector, isLiquid = @isLiquid
		WHERE id = @id 
	END
GO
