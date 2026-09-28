export interface TradeOpportunityPlaybook {
  howToSpotOpportunity: string[];
  whenToEnter: {
    idealTrigger: string;
    confirmationCandle: string;
    limitOrderStrategy: string;
    invalidBeforeEntryIf: string;
  };
  whenToExit: {
    takeProfit1: string; // e.g. 50% scale at 1:2 R:R or internal liquidity
    takeProfit2: string; // e.g. full exit at external liquidity
    stopLossPlacement: string; // exact structural invalidation
    earlyExitWarning: string; // opposite structure shift or momentum stalling
  };
}

export interface MarketConcept {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  category: 'structure' | 'liquidity' | 'risk_execution' | 'imbalance';
  beginnerExplanation: string;
  advancedTerminology: {
    term: string;
    pronunciation?: string;
    definition: string;
    plainEnglishMetaphor: string;
  }[];
  howToIdentifyChecklist: string[];
  economicPerspective: {
    heading: string;
    coreMechanism: string;
    institutionalBehavior: string;
    orderBookDynamics: string;
    retailTrapExposed: string;
  };
  entryExitPlaybook: TradeOpportunityPlaybook;
  keyRules: string[];
  institutionalGoldenRule: string;
}

export const MARKET_STRUCTURE_CONCEPTS: Record<string, MarketConcept> = {
  bos: {
    id: 'bos',
    title: 'Break of Structure (BOS)',
    shortTitle: 'BOS',
    tagline: 'The Definitive Confirmation of Trend Continuation',
    category: 'structure',
    beginnerExplanation: 'Think of market structure like climbing stairs. In an uptrend, every time price climbs higher than the previous stair (the previous peak), it takes another firm step upward. That breakthrough is called a "Break of Structure" (BOS). It tells you that the current trend is healthy, strong, and continuing in the same direction.',
    advancedTerminology: [
      {
        term: 'Higher High (HH) & Higher Low (HL)',
        definition: 'The fundamental building blocks of an uptrend where each peak exceeds the previous peak, and each pullback trough stays above the prior trough.',
        plainEnglishMetaphor: 'Like hiking up a mountain: you keep pitching your camp at higher altitudes, never sinking back below your previous basecamp.'
      },
      {
        term: 'Displacement (Impulse Leg)',
        definition: 'A swift, aggressive price expansion characterized by consecutive large-bodied candles with minimal wicks, signifying aggressive institutional market buying.',
        plainEnglishMetaphor: 'A freight train barreling through a wooden barricade with zero deceleration.'
      },
      {
        term: 'Body Close Confirmation',
        definition: 'The requirement that the candlestick candle body closes fully above (or below) the prior swing point on your reference timeframe, rather than merely poking through with a wick.',
        plainEnglishMetaphor: 'Signing the lease and moving your furniture in, rather than merely glancing through the window.'
      }
    ],
    howToIdentifyChecklist: [
      '1. Identify the predominant trend: Verify a clear series of Higher Highs & Higher Lows (Uptrend) or Lower Lows & Lower Highs (Downtrend).',
      '2. Mark the exact peak of the most recent Swing High with a horizontal reference line.',
      '3. Watch the reaction at the line: Price must punch through with strong momentum/displacement.',
      '4. Strict Validation: Wait for the candlestick body to CLOSE cleanly above the swing high line. A wick-only break is considered a liquidity sweep until proven otherwise.',
      '5. Retracement Entry: Once BOS is confirmed, do NOT chase the top. Wait for price to pull back to the newly formed discount zone (Order Block or Fair Value Gap) to join the trend.'
    ],
    economicPerspective: {
      heading: 'The Economic Engine Behind BOS: Institutional Demand Surpluses',
      coreMechanism: 'Price moves in financial markets strictly due to order imbalances between buyers and sellers in the electronic central limit order book (CLOB). A Break of Structure occurs when large commercial participants (central banks, sovereign wealth funds, Tier-1 liquidity providers) evaluate that current price is below equilibrium fair value.',
      institutionalBehavior: 'Institutions cannot buy all their contracts at once without driving the price against themselves (slippage). Therefore, after accumulating inventory during pullbacks, their aggressive market orders chew through all resting limit sell orders at the previous high, displacing price higher into new territory.',
      orderBookDynamics: 'Above every swing high sits a dense cluster of resting orders: Buy Stop orders (used by short sellers to cut losses) and Buy Stop orders (used by breakout traders). When institutional volume consumes these orders, depth on the Ask side is wiped out, causing an explosive continuation.',
      retailTrapExposed: 'Amateur retail traders see a strong green candle breaking a high and impulsively "market buy" right at the peak of the impulse leg. Institutions immediately stop buying and allow price to retrace, putting the retail trader into immediate drawdown and emotional panic.'
    },
    entryExitPlaybook: {
      howToSpotOpportunity: [
        'Scan for a strong trending market printing consecutive Higher Highs & Higher Lows (or LLs & LHs in downtrend).',
        'Look for price to displace aggressively with 2-3 large-bodied candles that firmly CLOSE beyond the previous key swing level.',
        'Verify that the impulse leg created a clear unmitigated Demand Zone (Bullish Order Block) or Fair Value Gap (FVG) underneath the breakout.'
      ],
      whenToEnter: {
        idealTrigger: 'NEVER enter on the green breakout candle itself (chasing). Wait patiently for price to retrace 50% to 70.5% of the impulse leg into the freshly broken structure (Role Reversal) or newly formed Order Block.',
        confirmationCandle: 'Wait for price to tap the discount zone, reject the level, and print a bullish confirmation candle (e.g. 15M Bullish Engulfing or Pin Bar with wick rejection).',
        limitOrderStrategy: 'Set a Buy Limit at the top of the Bullish Order Block or at the 50% Consequent Encroachment (CE) of the Fair Value Gap created during the BOS displacement.',
        invalidBeforeEntryIf: 'Do NOT enter if the pullback plunges violently and closes a candle body below the Higher Low that initiated the impulse move. That negates the setup.'
      },
      whenToExit: {
        takeProfit1: 'TP1 at 1:2 Risk-Reward ratio or at the newly created Swing High (where previous breakout stopped). Close 50% of your position and move your Stop Loss to Breakeven (+1 pip buffer).',
        takeProfit2: 'TP2 at the next major Higher Timeframe Liquidity Pool (Daily High or Unmitigated Weekly Order Block). Trail stop behind each newly formed Higher Low.',
        stopLossPlacement: 'Place Stop Loss 2-3 pips + 1.5x ATR buffer below the lowest point of the Order Block / Higher Low that created the BOS.',
        earlyExitWarning: 'If price re-tests your entry but fails to produce bullish momentum within 4 candles, or prints a lower-timeframe bearish CHOCH, close the trade at Breakeven or minimal loss.'
      }
    },
    keyRules: [
      'A valid BOS requires a CANDLE BODY CLOSE beyond the structural swing point.',
      'Never enter at the exact moment of BOS (chasing the breakout); wait for the retracement leg.',
      'BOS on higher timeframes (4H, Daily) supersedes lower timeframes (1M, 5M).'
    ],
    institutionalGoldenRule: 'Never chase the candle that breaks structure. The breakout is the announcement; the retest is the invitation.'
  },

  choch: {
    id: 'choch',
    title: 'Change of Character (CHOCH)',
    shortTitle: 'CHOCH',
    tagline: 'The Earliest Alert of a Macro Trend Reversal',
    category: 'structure',
    beginnerExplanation: 'Imagine an elevator that has been going up floor by floor. Suddenly, instead of going to floor 10, it shudders, drops down, and crashes through the floor of level 8. That unexpected change in behavior is the "Change of Character" (CHOCH). It is the very first time price breaks the rule of the current trend, warning you that the buyers have lost control and the sellers are now taking over.',
    advancedTerminology: [
      {
        term: 'Market Shift / Trend Flip',
        definition: 'The exact structural pivot where an uptrend fails to print a higher high and instead prints a lower low (or a downtrend prints a higher high).',
        plainEnglishMetaphor: 'The baton being dropped in a relay race and grabbed by the opposing team.'
      },
      {
        term: 'Failure Swing',
        definition: 'When price makes an attempt to reach or exceed the previous high/low but runs out of volume, resulting in an anemic peak before collapsing.',
        plainEnglishMetaphor: 'A jumper attempting a hurdle, stalling in mid-air, and crashing down before clearing the bar.'
      },
      {
        term: 'Minor CHOCH vs Major CHOCH',
        definition: 'Minor CHOCH occurs on internal sub-structure (e.g. 5-minute timeframe) inside an impulse leg; Major CHOCH shatters the macro swing points on the 1H or 4H timeframe.',
        plainEnglishMetaphor: 'A gust of wind rattling your window (minor) vs a hurricane changing the local climate (major).'
      }
    ],
    howToIdentifyChecklist: [
      '1. In an ongoing uptrend, mark the LOW of the pullback candle that was responsible for pushing price to the final high (the last valid Higher Low).',
      '2. In an ongoing downtrend, mark the HIGH of the pullback candle that pushed price to the final low (the last valid Lower High).',
      '3. Monitor price as it reverses toward this key swing level.',
      '4. Confirmation: When price violates and CLOSES below that last Higher Low (for bearish CHOCH) or above that last Lower High (for bullish CHOCH), CHOCH is triggered.',
      '5. Execution: Do not panic sell at the break. Mark the newly formed premium supply zone or Order Block created during the drop, and enter when price retests it.'
    ],
    economicPerspective: {
      heading: 'The Economic Engine Behind CHOCH: Institutional Distribution & Regime Change',
      coreMechanism: 'Financial markets operate in cycles of Accumulation, Markup, Distribution, and Markdown (Wyckoff Cycle). CHOCH marks the transition from Markup to Distribution. The major players have achieved their profit targets and are actively offloading inventory.',
      institutionalBehavior: 'Smart Money entities offload hundreds of millions of dollars of long positions to euphoric retail buyers. Once their long books are liquidated, they initiate substantial short positions. Because there are no more large institutional buyers to absorb sell orders, the market collapses through prior support.',
      orderBookDynamics: 'The bids (buy orders) that previously supported the market dry up completely. When the last Higher Low is penetrated, sell-stop orders trigger in a chain reaction, tipping the order book balance irreversibly toward the Ask side.',
      retailTrapExposed: 'Retail traders view the first dip as "a great buying opportunity on the dip!" They pour money into buying what they believe is support, only to be absorbed by institutional short sellers driving price into a full-scale bear market.'
    },
    entryExitPlaybook: {
      howToSpotOpportunity: [
        'Identify a market that has swept major Higher Timeframe Liquidity (e.g. tapped a Daily Resistance or swept Equal Highs).',
        'Watch for the market to fail making a higher high (Failure Swing), followed by a violent red displacement candle slicing through the last Higher Low.',
        'Confirm that the candle body CLOSES cleanly below the last Higher Low on your trading timeframe (e.g. 15M or 1H).'
      ],
      whenToEnter: {
        idealTrigger: 'Do NOT sell in panic at the very bottom of the CHOCH drop. Mark the Bearish Order Block (the last green up-candle before the plunge) or the Fair Value Gap created during the breakdown.',
        confirmationCandle: 'Enter when price pulls back up into that Premium Supply Zone (at least 50% equilibrium of the drop) and prints a bearish rejection candle (e.g. Shooting Star or Bearish Engulfing).',
        limitOrderStrategy: 'Place a Sell Limit order at the base of the Bearish Order Block or 50% of the newly formed Bearish FVG.',
        invalidBeforeEntryIf: 'If the retracement rallies aggressively and closes a full candle body ABOVE the high that initiated the CHOCH, the reversal has failed — do not execute.'
      },
      whenToExit: {
        takeProfit1: 'TP1 at the first key demand pool / previous internal swing low. Secure 50% of the trade profits and immediately shift your Stop Loss to Breakeven (+1 pip buffer).',
        takeProfit2: 'TP2 at the major Sell-Side Liquidity (SSL) resting below the macro range (e.g. equal bottoms or daily swing lows).',
        stopLossPlacement: 'Place Stop Loss 2-3 pips + ATR spread buffer strictly ABOVE the highest peak of the Order Block that caused the CHOCH.',
        earlyExitWarning: 'If price retraces to your entry and stalls for extended candles without dropping, or prints an inverse lower-timeframe bullish CHOCH, exit with minimal drawdown.'
      }
    },
    keyRules: [
      'A true CHOCH must break the LAST STRUCTURAL SWING POINT that created the most recent extreme.',
      'A CHOCH that occurs at a higher timeframe Key Level (Daily Support/Resistance or Weekly Order Block) carries 10x higher statistical validity than one in the middle of a range.',
      'Always look for institutional volume or fair value gaps confirming the shift.'
    ],
    institutionalGoldenRule: 'A CHOCH whispers that the regime has flipped. Respect the shift or the market will take your capital without an apology.'
  },

  fvg: {
    id: 'fvg',
    title: 'Fair Value Gaps (FVG) & Imbalance Inefficiencies',
    shortTitle: 'FVG',
    tagline: 'The Institutional Magnet Where Smart Money Rebalances The Market',
    category: 'imbalance',
    beginnerExplanation: 'Imagine an auctioneer in a packed hall who gets so excited by a billionaire bidder that he jumps the price from $100 straight to $300 without giving regular buyers a chance to bid at $150, $200, or $250. Later, the auction must pause and offer goods at those missed prices to be fair. In trading, when institutional algorithms buy so fast that they skip prices, they leave a 3-candle hole called a "Fair Value Gap" (FVG). Price acts like a magnet, returning to fill that gap before exploding higher.',
    advancedTerminology: [
      {
        term: '3-Candle Imbalance Anatomy',
        definition: 'A sequence of 3 candles where Candle 1\'s high does not touch Candle 3\'s low (in a bullish FVG), leaving an open space in Candle 2\'s body where only buyers participated.',
        plainEnglishMetaphor: 'A missing tooth in a row of teeth — an obvious gap that demands to be filled.'
      },
      {
        term: 'Consequent Encroachment (CE 50%)',
        definition: 'The exact 50% midpoint of the Fair Value Gap. This is the institutional equilibrium point where smart money algorithms most frequently execute limit orders.',
        plainEnglishMetaphor: 'Filling the gas tank exactly to the halfway mark before continuing the road trip.'
      },
      {
        term: 'BISI vs SIBI',
        definition: 'BISI (Buyside Imbalance Sellside Inefficiency) is a Bullish FVG where price surged too fast upward; SIBI (Sellside Imbalance Buyside Inefficiency) is a Bearish FVG where price plunged too fast downward.',
        plainEnglishMetaphor: 'A one-way express elevator that skipped every intermediate floor.'
      }
    ],
    howToIdentifyChecklist: [
      '1. Scan for a large, energetic displacement candle with a massive body and minimal wicks (Candle 2).',
      '2. Look at the candle immediately preceding it (Candle 1) and the candle immediately following it (Candle 3).',
      '3. Measure the gap: In a Bullish FVG, there must be empty space between the HIGH of Candle 1 and the LOW of Candle 3.',
      '4. Draw a horizontal rectangular box spanning from Candle 1\'s high to Candle 3\'s low, extended to the right.',
      '5. Mark the 50% Consequent Encroachment (CE) line across the center of the box.',
      '6. Wait for price to revisit this box in the future — do NOT chase price when the gap first appears!'
    ],
    economicPerspective: {
      heading: 'The Economic Engine Behind FVGs: Algorithmic Delivery & Market Efficiency',
      coreMechanism: 'Financial exchanges are governed by auction market theory and the Efficient Market Hypothesis. For a market to be orderly, both buyers and sellers must have the opportunity to transact at every single price tick.',
      institutionalBehavior: 'When Tier-1 institutions execute high-urgency market orders (e.g. during CPI, Non-Farm Payrolls, or Central Bank rate announcements), they drain all resting limit orders instantly. This creates a severe one-sided liquidity vacuum. The institutional algorithms are programmed to subsequently guide price back into this vacuum to allow commercial counterparts to balance their books at fair value.',
      orderBookDynamics: 'Inside an FVG, zero limit sell orders were matched during the explosive rally. When price revisits the FVG, resting institutional buy limit orders (standing by to buy at fair value) are filled. Once filled, price promptly bounces violently away from the gap.',
      retailTrapExposed: 'Retail traders see the price dropping back into the FVG and assume "the trend is crashing, I must short now!" They sell right into the FVG, providing the exact liquidity institutional limit orders need to buy and trap them.'
    },
    entryExitPlaybook: {
      howToSpotOpportunity: [
        'Identify a higher-timeframe trend (e.g. 4H or 1H bullish market structure).',
        'Look for an aggressive displacement move that leaves a clean, obvious Fair Value Gap (at least 15-20 pips on Forex, 30-50 pts on Gold/Indices).',
        'Verify that the FVG aligns with an institutional Order Block or key Discount Fib zone (0.50 to 0.618).'
      ],
      whenToEnter: {
        idealTrigger: 'Wait patiently for price to retrace and tap into the FVG box. Ideal entry is at the 50% Consequent Encroachment (CE) level.',
        confirmationCandle: 'Conservative Entry: Wait for price to tap the FVG, react, and print a 5M or 15M reversal candle (Hammer or Bullish Engulfing) that closes back outside the gap.',
        limitOrderStrategy: 'Aggressive Entry: Place a Limit Order directly at the Consequent Encroachment (50% midpoint) of the FVG box.',
        invalidBeforeEntryIf: 'If price slices completely through the FVG and a full candle body CLOSES below the LOW of Candle 1, the FVG is considered "inverted" (invalidated as support) — cancel orders immediately!'
      },
      whenToExit: {
        takeProfit1: 'TP1 at the origin of the swing high that formed before the retracement started (1:2 to 1:3 R:R). Close 50% of the trade and move Stop Loss to Breakeven (+1 pip buffer).',
        takeProfit2: 'TP2 at the next major opposing unmitigated FVG or major Buy-Side Liquidity (BSL) pool on the higher timeframe.',
        stopLossPlacement: 'Place Stop Loss 2-3 pips + 1.5x ATR spread buffer BELOW the low of Candle 1 (or below the swing low anchor).',
        earlyExitWarning: 'If price enters the FVG and begins closing multiple consecutive candle bodies below the 50% CE level, smart money absorption has failed — cut the trade early with minimal loss.'
      }
    },
    keyRules: [
      'A true FVG consists of 3 distinct candles with an untouched gap between Candle 1 and Candle 3 wicks.',
      'The 50% Consequent Encroachment (CE) is the highest-probability reaction level inside any FVG.',
      'Once an FVG has been filled and respected, it is "mitigated" and loses its magnetic potency.'
    ],
    institutionalGoldenRule: 'Fair Value Gaps are the market\'s unpaid debts. The market always returns to pay them before embarking on its true journey.'
  },

  liquidity: {
    id: 'liquidity',
    title: 'Market Liquidity & Stop Hunting Economics',
    shortTitle: 'Liquidity',
    tagline: 'Why Your Stop Loss Gets Hit Right Before The Market Reverses',
    category: 'liquidity',
    beginnerExplanation: 'Have you ever had this happen: you place a buy trade with a Stop Loss just below a double bottom support level. Price suddenly drops, hits your stop loss to the exact pip, knocks you out with a loss... and then immediately shoots to the moon in your intended direction? You were not unlucky; you were the victim of a "Liquidity Sweep". In trading, "liquidity" simply means people\'s stop loss orders.',
    advancedTerminology: [
      {
        term: 'Buy-Side Liquidity (BSL)',
        definition: 'A pool of resting buy stop orders located above prominent swing highs, double tops, and resistance lines.',
        plainEnglishMetaphor: 'A reservoir of gasoline waiting above the ceiling for a rocket to ignite.'
      },
      {
        term: 'Sell-Side Liquidity (SSL)',
        definition: 'A pool of resting sell stop orders located below prominent swing lows, double bottoms, and support lines.',
        plainEnglishMetaphor: 'A pool of sell volume waiting below the trapdoor.'
      },
      {
        term: 'Liquidity Sweep / Stop Hunt (Judas Swing)',
        definition: 'A deliberate, engineered price spike designed to trigger stop-loss orders in order to absorb counterparty volume before launching the true intended market move.',
        plainEnglishMetaphor: 'A fisherman jerking the line with fake bait to hook the big fish before reeling it in.'
      },
      {
        term: 'Inducement (IDM)',
        definition: 'A premature, obvious chart pattern engineered by market makers to entice impatient retail traders into putting their money on the line too early.',
        plainEnglishMetaphor: 'A honey trap set in the middle of the field.'
      }
    ],
    howToIdentifyChecklist: [
      '1. Locate obvious retail patterns: Find clean Double Tops, Double Bottoms, or neat trendlines with 3+ touches.',
      '2. Mark the liquidity resting pools: Draw horizontal boxes directly ABOVE double tops (BSL) and directly BELOW double bottoms (SSL).',
      '3. Anticipate the grab: Expect price to deliberately pierce those levels with a swift, sharp wick during high-volume sessions (London Open or NY Open).',
      '4. Observe the wick rejection: If price pierces the level, sweeps the stops, and snaps back leaving a long wick (Pin Bar / Kangaroo Tail), the liquidity has been collected.',
      '5. Trade WITH the smart money: Enter in the direction of the rejection candle, placing your stop safely outside the newly formed sweep extreme.'
    ],
    economicPerspective: {
      heading: 'The Economic Law of Counterparty Sizing: Why Banks NEED Retail Stops',
      coreMechanism: 'In all exchange-traded and OTC foreign exchange markets, every transaction requires a counterparty. To BUY 10,000 lots of EUR/USD ($1,000,000,000 nominal), there MUST be someone willing to SELL 10,000 lots at that exact price.',
      institutionalBehavior: 'If a bank or hedge fund executed a $1 billion buy order in normal low-liquidity conditions, there wouldn\'t be enough sellers. The algorithm would buy at 1.0800, 1.0810, 1.0830, resulting in millions in slippage losses.',
      orderBookDynamics: 'What is a retail trader\'s Stop Loss on a BUY position? By technical definition, it is a MARKET SELL ORDER! When thousands of retail traders place their stops below a double bottom, they have unknowingly placed a massive cluster of SELL orders in one tiny price pocket. The bank algorithm pushes price down 5 pips to trigger those sell stops, giving the bank the exact massive sell liquidity it needs to fill its $1 billion buy order at a discount!',
      retailTrapExposed: 'Retail books teach: "Put your stop 2 pips below support." Institutional algorithms know this exact rule. They sweep that 2-pip zone, collect the liquidity, and reverse.'
    },
    entryExitPlaybook: {
      howToSpotOpportunity: [
        'Identify obvious Equal Highs (Double/Triple Tops) or Equal Lows (Double/Triple Bottoms) where retail traders have clustered their stop losses.',
        'Wait for the high-volatility session open (London 08:00 GMT or New York 13:30 GMT).',
        'Watch for the engineered Judas Swing: an aggressive price spike that punctures the support/resistance level by 5 to 15 pips.'
      ],
      whenToEnter: {
        idealTrigger: 'Wait for the sweep candle to finish and CLOSE back INSIDE the range, leaving a long rejection wick (Pin Bar / Kangaroo Tail).',
        confirmationCandle: 'Enter on the open of the very next candle following the sweep close, or wait for a 1-minute/5-minute micro-CHOCH in the reversal direction.',
        limitOrderStrategy: 'Do NOT place blind limit orders in front of a liquidity sweep. Only execute MARKET or BUY STOP orders after the sweep rejection has proven itself.',
        invalidBeforeEntryIf: 'Do NOT enter if the candle that pierces the level CLOSES strongly with a massive body OUTSIDE the range. That is a true breakout, not a liquidity sweep!'
      },
      whenToExit: {
        takeProfit1: 'TP1 at the midpoint of the range (Range Equilibrium - 50%). Bank 50% profit and move Stop Loss to Breakeven (+1 pip buffer).',
        takeProfit2: 'TP2 at the OPPOSITE liquidity pool (e.g. if you bought an SSL sweep, target the Buy-Side Liquidity resting above the range highs).',
        stopLossPlacement: 'Place Stop Loss 2-3 pips + 1.5x ATR buffer strictly BEYOND the extreme tip of the sweep wick.',
        earlyExitWarning: 'If price revisits and breaks through the extreme tip of the sweep wick, your thesis is completely disproven — exit instantly.'
      }
    },
    keyRules: [
      'Liquidity lies where retail stops hide: below double bottoms, above double tops, and below diagonal trendlines.',
      'Do not place your stop loss right where everyone else places theirs.',
      'Wait for the liquidity sweep to happen BEFORE you enter the trade!'
    ],
    institutionalGoldenRule: 'If you cannot spot where the liquidity is in the market, YOUR stop loss is the liquidity.'
  }
};

export interface StopLossTakeProfitRule {
  id: string;
  title: string;
  category: 'stop_loss' | 'take_profit' | 'scaling';
  summary: string;
  detailedWalkthrough: string[];
  visualTip: string;
  badPractice: string;
  bestPractice: string;
  institutionalWisdom: string;
}

export const SL_TP_MASTER_RULES: StopLossTakeProfitRule[] = [
  {
    id: 'structural_sl',
    title: 'The Golden Structural Stop Loss Rule',
    category: 'stop_loss',
    summary: 'Never place your stop loss at an arbitrary dollar figure ($50 or $100) or an arbitrary pip amount. Your stop loss MUST be placed where your technical thesis is proven completely invalid.',
    detailedWalkthrough: [
      '1. Identify the structural invalidation point: For a LONG position, this is the lowest point of the swing low or the origin of the impulse leg.',
      '2. Add the ATR (Average True Range) Spread Buffer: Take the 14-period ATR on your trading timeframe. Add 1.5x of the ATR (or at least 3-5 pips for EUR/USD, 10-15 pips for GBP/JPY or USD/ZAR) BELOW the swing low wick.',
      '3. Why the buffer matters: Broker spreads widen during news releases and high-impact volatility. Without the buffer, an artificial spread spike will close your trade even if price never physically touches your level.',
      '4. Calculate position size backwards: Once you know the exact price distance between entry and the structural stop loss, use the strict Position Sizer to compute the exact lot size that limits risk to 1% of your account.'
    ],
    visualTip: 'Stop Loss = Lowest Swing Wick - (Spread + 1.5x ATR). If price hits this, the trend is genuinely broken.',
    badPractice: 'Placing a tight 5-pip stop loss on a 15-minute timeframe just so you can use a bigger lot size. This guarantees a 90% loss rate due to market noise.',
    bestPractice: 'Giving the trade room to breathe behind the true institutional invalidation anchor, resizing your lots down to keep total dollar risk at 1%.',
    institutionalWisdom: 'Amateurs adjust their stop loss to fit their greed. Professionals adjust their lot size to fit their stop loss.'
  },
  {
    id: 'fvg_ob_sl',
    title: 'Order Block & Fair Value Gap (FVG) Stop Placement',
    category: 'stop_loss',
    summary: 'When entering off an institutional Footprint (Order Block or Fair Value Gap), place the stop loss strictly beyond the invalidation threshold of that specific imbalance.',
    detailedWalkthrough: [
      '1. For a Bullish Order Block (OB): The stop loss must sit 2-3 pips below the LOWEST wick of that Order Block candle.',
      '2. For a Fair Value Gap (FVG): The 50% equilibrium level (Consequent Encroachment) should hold. If price closes fully through the FVG and breaches Candle 1\'s extreme, the imbalance has failed.',
      '3. If price violates the Order Block, do not hold on and pray. The institutional order flow has failed, and holding will only turn a small 1% loss into an account-destroying 20% loss.'
    ],
    visualTip: 'Place SL 2 pips beyond the tail of the Order Block. If it breaks, Smart Money has stepped aside.',
    badPractice: 'Averaging down ("Martingale") when price pushes through the Order Block, hoping it turns back.',
    bestPractice: 'Accepting the clean statistical stop-out immediately. An Order Block either reacts promptly with displacement or it is invalid.',
    institutionalWisdom: 'Cut your losses with mechanical speed. The market will offer 100 new setups tomorrow, but only if you still have capital.'
  },
  {
    id: 'multi_tp_scaling',
    title: 'Multi-Target Take Profit & Asymmetric Scaling',
    category: 'take_profit',
    summary: 'Never exit your entire position at once. Use a two-tiered Take Profit architecture to lock in guaranteed profit while letting winners run into macro targets.',
    detailedWalkthrough: [
      '1. TP1 (Internal Liquidity Target - 1:2 R:R): Place your first target right before the nearest opposing swing high or internal liquidity pool. When price reaches TP1, close 50% of your position.',
      '2. Breakeven Security Move: Immediately after TP1 is hit, move your Stop Loss on the remaining 50% to your ENTRY PRICE + 1 pip (covering broker commission). The trade is now 100% RISK-FREE ("Free Roll").',
      '3. TP2 (External Macro Target - 1:3 to 1:5 R:R): Leave the remaining 50% open to capture the major daily or 4H liquidity pool (previous week\'s high, major order block).',
      '4. Result: Even if the market turns violently around after TP1, you have banked profit and cannot lose a single cent on the remainder.'
    ],
    visualTip: 'TP1 = 50% exit at 1:2 R:R (Move SL to Breakeven). TP2 = Remaining 50% running to Major Liquidity Target.',
    badPractice: 'Closing all trades at 1:1 risk-reward or letting full-size winners retrace all the way back into losses without taking partials.',
    bestPractice: 'Securing capital at internal liquidity and letting institutional momentum carry the second half of the trade to macro targets.',
    institutionalWisdom: 'A green trade should never be allowed to turn into a red trade once your first target has been validated.'
  },
  {
    id: 'trailing_bos_sl',
    title: 'Dynamic Trailing Stop Behind Confirmed BOS',
    category: 'scaling',
    summary: 'Ride massive multi-hundred-pip trends by locking in profit progressively behind each new confirmed Break of Structure.',
    detailedWalkthrough: [
      '1. When in a winning long trend, do NOT move your stop loss prematurely while price is still ranging.',
      '2. Wait for price to produce a fresh, verified Break of Structure (BOS) with a clean candle body close above the prior high.',
      '3. Once the new BOS is verified, trail your Stop Loss up to sit safely underneath the newly formed Higher Low that produced that breakthrough.',
      '4. Repeat this trailing sequence for every consecutive BOS. You will exit automatically only when the market produces a genuine CHOCH, capturing 80-90% of the entire macro move.'
    ],
    visualTip: 'Trail SL up to each new Higher Low ONLY after a new Higher High candle body closes.',
    badPractice: 'Manually trailing your stop too close candle-by-candle. Normal breathing room wicks will prematurely kick you out of a 500-pip trend.',
    bestPractice: 'Anchor your trailing stop ONLY behind major structural swing points verified by a true BOS.',
    institutionalWisdom: 'Let structure dictate your exit, not your fear of giving back 10 pips of unrealized profit.'
  }
];

export interface StructureQuizItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  institutionalRule: string;
}

export const STRUCTURE_QUIZ_QUESTIONS: StructureQuizItem[] = [
  {
    id: 'sq-1',
    question: 'What is the absolute requirement for a valid Break of Structure (BOS) in an uptrend?',
    options: [
      'Price simply touches the previous high with a thin wick',
      'A candlestick must firmly CLOSE its body above the prior swing high on the timeframe',
      'The RSI must be over 80',
      'It must occur during the Asian trading session'
    ],
    correctIndex: 1,
    explanation: 'A valid Break of Structure requires a full candlestick BODY CLOSE beyond the structural swing point. If only a wick pierces the high and quickly pulls back, it is categorized as a liquidity sweep, not a confirmed BOS.',
    institutionalRule: 'Body closes break structure; wicks hunt liquidity. Never confuse the two.'
  },
  {
    id: 'sq-2',
    question: 'From an economics and order book perspective, why do institutional market makers sweep retail stop losses below double bottoms?',
    options: [
      'Because market makers want to be mean to retail beginners',
      'Because a retail Stop Loss on a BUY position is technically a SELL STOP market order, providing the massive sell volume institutions require to fill their massive BUY orders without slippage',
      'Because the broker wants to keep the spread fees',
      'Because double bottoms are mathematically illegal'
    ],
    correctIndex: 1,
    explanation: 'Institutions trading hundreds of millions of dollars need massive counterparty volume. When retail traders put their stops under double bottoms, they create a dense pool of SELL orders. Smart money pushes price down to trigger those sell stops, providing the exact matching sell liquidity to fill their huge buy positions at discount prices.',
    institutionalRule: 'Institutions need counterparties. If you place your stop where everyone else does, you are providing the fuel for their trade.'
  },
  {
    id: 'sq-3',
    question: 'How does a Change of Character (CHOCH) differ from a Break of Structure (BOS)?',
    options: [
      'CHOCH confirms trend continuation; BOS indicates a reversal',
      'BOS confirms trend continuation (HH breaking in uptrend), while CHOCH is the first structural signal of a trend reversal (breaking the last HL in an uptrend)',
      'They are completely identical terms with no difference',
      'CHOCH can only occur in crypto markets'
    ],
    correctIndex: 1,
    explanation: 'BOS (Break of Structure) means the current trend is continuing by breaking the previous high in an uptrend or previous low in a downtrend. CHOCH (Change of Character) signals a shift in market regime when the sequence breaks (e.g. price drops below the previous higher low in an uptrend).',
    institutionalRule: 'BOS continues the story; CHOCH turns the page to a new chapter.'
  },
  {
    id: 'sq-fvg',
    question: 'Where is the highest probability institutional entry level when trading a Fair Value Gap (FVG)?',
    options: [
      'At random somewhere near the top of the chart',
      'At the 50% Consequent Encroachment (CE) midpoint of the 3-candle gap',
      'Always 100 pips above the gap',
      'Before the gap even forms'
    ],
    correctIndex: 1,
    explanation: 'The 50% Consequent Encroachment (CE) represents the true equilibrium point of the price imbalance where institutional limit orders are clustered.',
    institutionalRule: 'Respect the 50% Consequent Encroachment. That is the fair value center of gravity.'
  },
  {
    id: 'sq-4',
    question: 'Where should a disciplined trader place their Stop Loss according to the Golden Structural Invalidation Rule?',
    options: [
      'Exactly 10 pips away regardless of market conditions',
      'At the exact swing low wick with zero breathing room',
      'Beyond the structural invalidation point plus an ATR spread buffer (1.5x ATR or 3-5 pips) to prevent spread spikes from hunting the position',
      'Traders should never use a stop loss'
    ],
    correctIndex: 2,
    explanation: 'A professional stop loss is placed beyond the structural invalidation point with an added ATR buffer. This accounts for broker spread inflation during high-impact news and volatility, ensuring you are only stopped out when your analysis is genuinely invalidated.',
    institutionalRule: 'Amateurs adjust their stop loss to fit their greed. Professionals adjust their lot size to fit their structural stop loss.'
  },
  {
    id: 'sq-5',
    question: 'What is the primary benefit of the Multi-Target Scaling strategy (TP1 at 1:2 R:R and moving SL to breakeven)?',
    options: [
      'It increases broker commissions',
      'It locks in 50% realized profit and renders the remaining position 100% risk-free, eliminating psychological stress',
      'It guarantees you will never have a losing day in your life',
      'It allows you to trade with 100x leverage'
    ],
    correctIndex: 1,
    explanation: 'Closing 50% at TP1 (1:2 R:R) and trailing the Stop Loss to Breakeven secures banked profit and ensures that even in the event of an abrupt macro reversal, the overall trade finishes green. This builds consistent equity curves and protects emotional capital.',
    institutionalRule: 'A winning trade must never be permitted to morph into a red trade once initial structural targets are met.'
  }
];
