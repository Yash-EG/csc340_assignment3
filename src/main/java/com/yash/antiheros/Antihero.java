package com.yash.antiheros;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "antiheros")
public class Antihero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long characterId;

    @Column(name = "character_name")
    private String name;
    private String description;
    private String universe;
    private String weapon;
    private String morality;

    // Constructors
    public Antihero() {}
    public Antihero(String name, String description, String universe, String weapon, String morality) {
        this.name = name;
        this.description = description;
        this.universe = universe;
        this.weapon = weapon;
        this.morality = morality;
    }

    // Getters and Setters
    public long getCharacterId() { return characterId; }
    public void setCharacterId(long characterId) { this.characterId = characterId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getUniverse() { return universe; }
    public void setUniverse(String universe) { this.universe = universe; }

    public String getWeapon() { return weapon; }
    public void setWeapon(String weapon) { this.weapon = weapon; }

    public String getMorality() { return morality; }
    public void setMorality(String morality) { this.morality = morality; }
}
