package com.gltbuilds.tradeblotter.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "trades")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Instrument is required")
    private String instrument;

    @NotBlank(message = "Side is required (BUY/SELL)")
    private String side;

    @NotNull @Positive
    private Integer quantity;

    @NotNull @Positive
    private BigDecimal price;

    @NotBlank(message = "Trader is required")
    private String trader;

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
}