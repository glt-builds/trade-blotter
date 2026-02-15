package com.gltbuilds.tradeblotter.repository;

import com.gltbuilds.tradeblotter.model.Trade;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TradeRepository extends JpaRepository<Trade, Long> {
    List<Trade> findByTrader(String trader);
    List<Trade> findByInstrument(String instrument);
}