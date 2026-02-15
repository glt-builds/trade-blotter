package com.gltbuilds.tradeblotter.service;

import com.gltbuilds.tradeblotter.model.Trade;
import com.gltbuilds.tradeblotter.repository.TradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TradeService {

    private final TradeRepository tradeRepository;

    public Trade submitTrade(Trade trade) {
        return tradeRepository.save(trade);
    }

    public List<Trade> getAllTrades() {
        return tradeRepository.findAll();
    }

    public List<Trade> getTradesByTrader(String trader) {
        return tradeRepository.findByTrader(trader);
    }

    public List<Trade> getTradesByInstrument(String instrument) {
        return tradeRepository.findByInstrument(instrument);
    }
}