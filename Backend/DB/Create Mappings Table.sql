USE [DealDB]
GO

/****** Object:  Table [dbo].[mappings]    Script Date: 29-04-2024 11:36:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[mappings](
	[deal_id] [nchar](10) NOT NULL,
	[fund_name] [nchar](25) NOT NULL,
	[as_of_date] [date] NOT NULL,
	[local_cmmt] [float] NULL,
	[is_active] [smallint] NULL,
	[realized_irr] [float] NULL,
	[realized_pnl] [float] NULL,
	[realized_date] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[deal_id] ASC,
	[fund_name] ASC,
	[as_of_date] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[mappings]  WITH CHECK ADD  CONSTRAINT [fk_deal_id] FOREIGN KEY([deal_id])
REFERENCES [dbo].[Deals] ([id])
GO

ALTER TABLE [dbo].[mappings] CHECK CONSTRAINT [fk_deal_id]
GO


