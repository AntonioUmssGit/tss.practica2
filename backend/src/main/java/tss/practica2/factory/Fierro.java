package tss.practica2.factory;

import lombok.Data;

@Data
public class Fierro {
    private double longitud;

    public Fierro(double longitud){
        this.longitud = longitud;
    }
}
