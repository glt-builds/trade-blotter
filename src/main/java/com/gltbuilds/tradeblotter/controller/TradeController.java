package com.gltbuilds.tradeblotter.controller;

import com.gltbuilds.tradeblotter.model.Trade;
import com.gltbuilds.tradeblotter.service.TradeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/trades")
@RequiredArgsConstructor
public class TradeController {

    private final TradeService tradeService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Trade submitTrade(@Valid @RequestBody Trade trade) {
        return tradeService.submitTrade(trade);
    }

    @GetMapping
    public List<Trade> getAllTrades() {
        return tradeService.getAllTrades();
    }

    @GetMapping("/trader/{trader}")
    public List<Trade> getByTrader(@PathVariable String trader) {
        return tradeService.getTradesByTrader(trader);
    }

    @GetMapping("/instrument/{instrument}")
    public List<Trade> getByInstrument(@PathVariable String instrument) {
        return tradeService.getTradesByInstrument(instrument);
    }
}